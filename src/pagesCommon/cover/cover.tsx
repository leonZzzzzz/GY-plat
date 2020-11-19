import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image
} from "@tarojs/components";
import "./cover.scss";
import { serviceFee } from "@/api/index"

export default class Index extends Component {

  state = {
    bargainlist: [], newbargainlist: []
  };
  componentDidMount() {
    this.getlist()
  }
  getlist = async () => {
    const res = await serviceFee()
    if (res.data.code == 20000) {
      let bargainlist = res.data.data
      let newbargainlist = bargainlist.slice(0, 1)
      bargainlist = bargainlist.slice(1)
      this.setState({ bargainlist: bargainlist, newbargainlist })
    }
  }

  config: Config = {
    "navigationBarTitleText": "服务费"
  };
  render() {
    let { newbargainlist, bargainlist } = this.state
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
              <Text>{newbargainlist[0].transactionFee}</Text>
              <Text>总交易服务费</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{newbargainlist[0].logisticsFee}</Text>
              <Text>总物流服务费</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{newbargainlist[0].packageFee}</Text>
              <Text>总包装服务费</Text>
              <Text>(元)</Text>
            </View>
          </View>
        </View>

        {bargainlist.length && (
          <Block>
            {bargainlist.map(item => {
              return (
                <View className="column padd">
                  <View className='store-view'>
                    <Text>{item.category}</Text>
                  </View>
                  <View className="perform overView">
                    <View className="perform-a per-b cover">
                      <Text>{item.transactionFee}</Text>
                      <Text>交易服务费</Text>
                      <Text>(元)</Text>
                    </View>
                    <View className="perform-a per-b cover">
                      <Text>{item.logisticsFee}</Text>
                      <Text>物流服务费</Text>
                      <Text>(元)</Text>
                    </View>
                    <View className="perform-a per-b cover">
                      <Text>{item.packageFee}</Text>
                      <Text>包装服务费</Text>
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
