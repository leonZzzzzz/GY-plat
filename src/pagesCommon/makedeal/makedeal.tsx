import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image,
  Picker,
} from "@tarojs/components";
import "./makedeal.scss";
import { getquantile } from "@/utils/requestphp"
import { salesorder } from "@/api/index"

export default class Index extends Component {

  state = {
    date: false,
    val: '年',
    startTime: '',
    endTime: '',
    bargainlist: [],
    newbargainlist: [],
    pageNum: '1',
  };
  componentDidMount() {
    this.getbargain(this.state.startTime, this.state.endTime)
  }
  getbargain = async (startTime, endTime) => {
    const params = { startTime: startTime, endTime: endTime }
    const res = await salesorder(params)
    if (res.data.code == 20000) {
      let list = res.data.data
      let newbargainlist = list.slice(0, 1)
      list = list.slice(1)
      let bargainlist = this.state.bargainlist
      list.map(item => {
        bargainlist.push(item)
      })
      this.setState({ bargainlist: bargainlist, newbargainlist })
    }
  }

  // 时间
  ontimeChange(e) {
    this.setState({ endTime: e.detail.value })
  }
  onstartChange(e) {
    this.setState({ startTime: e.detail.value })
  }
  // 查询
  onSearch() {
    this.setState({ bargainlist: [] })
    this.getbargain(this.state.startTime, this.state.endTime)
  }

  // 去到订单列表
  gocandraw() {
    Taro.navigateTo({
      url: '../order-list/list'
    })
  }




  showdata() {
    this.setState({ date: true })
  }
  choosedate(e) {
    console.log(e)
    const val = e.currentTarget.dataset.value;
    this.setState({ date: false, val: val })
  }
  config: Config = {
    "navigationBarTitleText": "成交订单"
  };
  render() {
    const { bargainlist, newbargainlist, startTime, endTime, } = this.state
    return (
      <Block>
        <View className='choose-data'>
          <Picker mode='date' onChange={this.onstartChange}>
            <View className='picker1'>
              {startTime ? (
                <Text>{startTime}</Text>
              ) : (
                  <Text>请选择开始时间</Text>
                )}
              <View className='qcfont qc-icon-chevron-right'></View>
            </View>
          </Picker>
          {/* <View>
            <View className='picker' onClick={this.showdata}>
              <Text>{val}</Text>
              <View className='qcfont qc-icon-chevron-right'></View>
            </View>
            {date && (
              <View className='ymd'>
                <Text data-value='年' onClick={this.choosedate}>年</Text>
                <Text data-value='月' onClick={this.choosedate}>月</Text>
                <Text data-value='日' onClick={this.choosedate}>日</Text>
              </View>
            )}
          </View> */}
          <Picker mode='date' onChange={this.ontimeChange}>
            <View className='picker1'>
              {endTime ? (
                <Text>{endTime}</Text>
              ) : (
                  <Text>请选择结束时间</Text>
                )}
              <View className='qcfont qc-icon-chevron-right'></View>
            </View>
          </Picker>
          <View className='sear' onClick={this.onSearch}>查询</View>
        </View>
        <View className="container column padd">
          <View className='info-store'>
            <Image src={require('../../images/item/gy-icon_31.png')}></Image>
            <Text>合计</Text>
            <Image src={require('../../images/item/gy-icon_33.png')}></Image>
          </View>
          <View className="perform overView">
            <View className="perform-a per-b" onClick={this.gocandraw}>
              <Text>{newbargainlist[0].count}</Text>
              <Text>成交总订单数</Text>
              <Text>(单)</Text>
            </View>
            <View className="perform-a per-b">
              <Text>{newbargainlist[0].money}</Text>
              <Text>成交总金额</Text>
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
                      <Text>成交订单数</Text>
                      <Text>(单)</Text>
                    </View>
                    <View className="perform-a per-b cover">
                      <Text>{item.money}</Text>
                      <Text>成交金额</Text>
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
