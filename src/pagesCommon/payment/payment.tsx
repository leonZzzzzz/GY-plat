import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image
} from "@tarojs/components";
import "./payment.scss";
import { creditOrder } from "@/api/index"

export default class Index extends Component {

  state = {
    bargainlist: [], newbargainlist: []
  };
  componentDidMount() {
    this.getlist()
  }
  getlist = async () => {
    const res = await creditOrder()
    if (res.data.code == 20000) {
      let bargainlist = res.data.data
      let newbargainlist = bargainlist.slice(0, 1)
      bargainlist = bargainlist.slice(1)
      this.setState({ bargainlist: bargainlist, newbargainlist })
    }
  }

  config: Config = {
    "navigationBarTitleText": "账期订单"
  };
  render() {
    let {newbargainlist, bargainlist} = this.state
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
              <Text>{newbargainlist[0].count}</Text>
              <Text>账期订单数</Text>
              <Text>(单)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{newbargainlist[0].money}</Text>
              <Text>账期金额</Text>
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
                      <Text>{item.count}</Text>
                      <Text>账期订单数</Text>
                      <Text>(单)</Text>
                    </View>
                    <View className="perform-a per-b cover">
                      <Text>{item.money}</Text>
                      <Text>账期金额</Text>
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
