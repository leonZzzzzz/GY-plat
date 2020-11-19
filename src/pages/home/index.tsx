import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
} from "@tarojs/components";
import "./index.scss";
import { getquantile } from "@/utils/requestphp"
import { getIndex, salesorder, creditOrder, serviceFee, cidentals } from "@/api/index"

export default class Index extends Component {

  // 跳入驻店铺
  commControl() {
    Taro.navigateTo({
      url: '../../pagesCommon/trade-control/trade-control'
    })
  }
  // 认证客户
  soldcust() {
    Taro.navigateTo({
      url: '../../pagesCommon/soldcust/soldcust'
    })
  }
  // 业务员
  goprofession() {
    Taro.navigateTo({
      url: '../../pagesCommon/profession/profession'
    })
  }
  // 成交订单
  onemore() {
    Taro.navigateTo({
      url: '../../pagesCommon/makedeal/makedeal'
    })
  }
  // 账期订单
  goCredit() {
    Taro.navigateTo({
      url: '../../pagesCommon/payment/payment'
    })
  }
  // 服务费
  gocharge() {
    Taro.navigateTo({
      url: '../../pagesCommon/cover/cover'
    })
  }
  // 费项
  goCollect() {
    Taro.navigateTo({
      url: '../../pagesCommon/collect/collect'
    })
  }
  state = {
    member: '',
    salesman: '',
    store: '',
    bargainlist: [{ count: 0, money: 0 }],
    creditlist: [{ count: 0, money: 0 }],
    servicelist: [{ transactionFee: 0, logisticsFee: 0, packageFee: 0 }],
    cidentlist: [{ annualFee: 0, deposit: 0, money: 0 }]
  };
  componentDidShow() {
    this.gethome()
  }
  gethome = async () => {
    const res = await getIndex()
    if (res.data.code == 20000) {
      const data = res.data.data
      this.setState({
        member: data.member,
        salesman: data.salesman,
        store: data.store
      })
      this.getbargain()
      this.getcreditOrder()
      this.getservice()
      this.getcriend()
    }
  }
  // 成交订单
  getbargain = async () => {
    const res = await salesorder({})
    if (res.data.code == 20000) {
      // const bargainlist = res.data.data
      // bargainlist[0].count = bargainlist[0].count.toFixed(bargainlist[0].count.toString().split(".")[1].length).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.setState({ bargainlist: res.data.data })
    }
  }
  // 账期
  getcreditOrder = async () => {
    const res = await creditOrder()
    if (res.data.code == 20000) {
      this.setState({ creditlist: res.data.data })
    }
  }
  // 服务费
  getservice = async () => {
    const res = await serviceFee()
    if (res.data.code == 20000) {
      this.setState({ servicelist: res.data.data })
    }
  }
  // 杂项
  getcriend = async () => {
    const res = await cidentals()
    if (res.data.code == 20000) {
      const cidentList = res.data.data
      // cidentList[0].deposit = getquantile(cidentList[0].deposit)
      this.setState({ cidentList })
    }
  }

  onShareAppMessage(e) {
    //这个分享的函数必须写在入口中，写在子组件中不生效
    // return {
    //   title: '自定义转发标题',
    //   imageUrl: '自定义转发的图片',
    //   success: function (res) {
    //     console.log(res);
    //     console.log("转发成功:" + JSON.stringify(res));
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //     console.log("转发失败:" + JSON.stringify(res));
    //   }
    // }
  }

  config: Config = {
    "navigationBarTitleText": "丰盈鲜生后台",
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#333744",
    "backgroundColor": "#333744",
    "backgroundColorTop": "#333744",
    "backgroundColorBottom": "#333744"
  };
  render() {
    const { store, member, salesman, bargainlist, creditlist, servicelist, cidentList } = this.state
    return (
      <Block>
        <View className="column color">
          <View className='row-three'>
            <View className='funds' onClick={this.commControl}>
              <Text className="con-a">入驻店铺(家)</Text>
              <Text className="con-b">{store}</Text>
              <View className="con-c">详情 <View className='qcfont qc-icon-chevron-right'></View></View>
            </View>
            <View className='funds' onClick={this.soldcust}>
              <Text className="con-a">认证客户(人)</Text>
              <Text className="con-b">{member}</Text>
              <View className="con-c">详情 <View className='qcfont qc-icon-chevron-right'></View></View>
            </View>
            <View className='funds' onClick={this.goprofession}>
              <Text className="con-a">业务员开单(单)</Text>
              <Text className="con-b">{salesman}</Text>
              <View className="con-c">详情 <View className='qcfont qc-icon-chevron-right'></View></View>
            </View>
          </View>
        </View>
        <View className="container column padd">
          <View className='store-view' onClick={this.onemore}>
            <Text>成交订单</Text>
            <View>更多 ></View>
          </View>
          {bargainlist && <View className="perform overView">
            <View className="perform-a per-b" >
              <Text>{(bargainlist[0].count)}</Text>
              <Text>成交总订单数</Text>
              <Text>(单)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{getquantile(bargainlist[0].money)}</Text>
              <Text>成交总金额</Text>
              <Text>(元)</Text>
            </View>
          </View>}
        </View>

        <View className="container column padd">
          <View className='store-view' onClick={this.goCredit}>
            <Text>账期订单</Text>
            <View>更多 ></View>
          </View>
          {creditlist && <View className="perform overView">
            <View className="perform-a per-b">
              <Text>{(creditlist[0].count)}</Text>
              <Text>账期总订单数</Text>
              <Text>(单)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{getquantile(creditlist[0].money)}</Text>
              <Text>账期总金额</Text>
              <Text>(元)</Text>
            </View>
          </View>}
        </View>

        <View className="container column padd">
          <View className='store-view' onClick={this.gocharge}>
            <Text>服务费</Text>
            <View>更多 ></View>
          </View>
          {servicelist && <View className="perform overView">
            <View className="perform-a per-b">
              <Text>{getquantile(servicelist[0].transactionFee)}</Text>
              <Text>总交易服务费</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{getquantile(servicelist[0].logisticsFee)}</Text>
              <Text>总物流服务费</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{getquantile(servicelist[0].packageFee)}</Text>
              <Text>总包装服务费</Text>
              <Text>(元)</Text>
            </View>
          </View>}
        </View>

        <View className="container column padd">
          <View className='store-view' onClick={this.goCollect}>
            <Text>店铺费项</Text>
            <View>更多 ></View>
          </View>
          {cidentList && <View className="perform overView">
            <View className="perform-a per-b">
              <Text>{getquantile(cidentList[0].annualFee)}</Text>
              <Text>已收年费总额</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{getquantile(cidentList[0].deposit)}</Text>
              <Text>留存保证金总额</Text>
              <Text>(元)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{getquantile(cidentList[0].money)}</Text>
              <Text>未提现总额</Text>
              <Text>(元)</Text>
            </View>
          </View>}
        </View>

      </Block>
    );
  }
}
