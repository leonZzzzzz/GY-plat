import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image
} from "@tarojs/components";
import "./collect.scss";
import { cidentals } from "@/api/index"

export default class Index extends Component {

  state = {
    bargainlist: [], newbargainlist: []
  };

  componentDidMount() {
    this.getlist()
  }
  getlist = async () => {
    const res = await cidentals()
    if (res.data.code == 20000) {
      let bargainlist = res.data.data
      let newbargainlist = bargainlist.slice(0, 1)
      bargainlist = bargainlist.slice(1)
      this.setState({ bargainlist: bargainlist, newbargainlist })
    }
  }
  config: Config = {
    "navigationBarTitleText": "店铺费项"
  };
  render() {
    let { newbargainlist, bargainlist,  } = this.state
    return (
      <Block>

        <View className="container column padd">
          <View className='info-store'>
            <Image src={require('../../images/item/gy-icon_31.png')}></Image>
            <Text>合计</Text>
            <Image src={require('../../images/item/gy-icon_33.png')}></Image>
          </View>
          <View className="perform overView">
            <View className="perform-a per-b">
              <Text>{newbargainlist[0].annualFee}</Text>
              <Text>已收年费总额</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{newbargainlist[0].deposit}</Text>
              <Text>留存保证金总额</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{newbargainlist[0].money}</Text>
              <Text>未提现总额</Text>
              <Text>(元)</Text>
            </View>
          </View>
        </View>

        {bargainlist.length > 0 && (
          <Block>
            {bargainlist.map(item => {
              return (
                <View className="column padd">
                  <View className='store-view'>
                    <Text>{item.category}</Text>
                  </View>
                  <View className="perform overView">
                    <View className="perform-a per-b cover">
                      <Text>{item.annualFee}</Text>
                      <Text>已收年费</Text>
                      <Text>(元)</Text>
                    </View>
                    <View className="perform-a per-b cover">
                      <Text>{item.deposit}</Text>
                      <Text>留存保证金</Text>
                      <Text>(元)</Text>
                    </View>
                    <View className="perform-a per-b cover">
                      <Text>{item.money}</Text>
                      <Text>未提现</Text>
                      <Text>(元)</Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </Block>
        )}
      </Block>
    );
  }
}
