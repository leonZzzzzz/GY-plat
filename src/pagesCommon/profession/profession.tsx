import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image,
  Input
} from "@tarojs/components";
import "./profession.scss";
import { salesmanlist } from "@/api/index"

export default class Index extends Component {

  state = {
    pageNum: '1',
    mobile: '',
    datalist: []
  };
  componentDidMount() {
    this.getlist(this.state.pageNum, this.state.mobile)
  }
  getlist = async (pageNum, mobile) => {
    const params = { pageNum: pageNum, pageSize: 15, mobile: mobile }
    const res = await salesmanlist(params)
    Taro.hideLoading()
    if (res.data.code == 20000) {
      const list = res.data.data.list
      const datalist = this.state.datalist
      list.map(item => {
        datalist.push(item)
      })
      this.setState({ datalist })
    }
  }
  onReachBottom() {
    this.state.pageNum++
    Taro.showLoading({ title: '加载中' })
    this.getlist(this.state.pageNum, this.state.mobile)
  }
  // 搜索
  onsearch(e) {
    const value = e.detail.value
    this.setState({ mobile: value, pageNum: 1 })
  }
  confirm() {
    this.setState({ datalist: [] })
    this.getlist(1, this.state.mobile)
  }
  config: Config = {
    navigationBarTitleText: "业务员"
  };
  render() {
    let {datalist} = this.state
    return (
      <Block>
        <View className='cust-fixed'>
          <View className="search">
            <Input placeholder='搜索手机号' onInput={this.onsearch} onConfirm={this.confirm}></Input>
          </View>
        </View>

        <View className='content'>
          {datalist.map(item => {
            return (
              <View className='content-a'>
                <View className='content-a-name'>
                  {/* <Image className='content-a-name-pic' src='../../images/item/guoyu-917_06.png'></Image> */}
                  <View>
                    <View className='content-a-name-user'>{item.name}<Text className='content-a-name-user-t'>({item.mobile})</Text></View>
                    <View className='content-a-name-phone'>店铺：{item.storeName}</View>
                  </View>
                </View>
                <View className='content-statis'>
                  <View className='left'>
                    <View className='statis-a'>
                      <Text>累计订单总金额：</Text>
                      <Text>{item.orderMoney}</Text>
                    </View>
                    <View className='statis-a'>
                      <Text>累计交易服务费：</Text>
                      <Text>{item.transactionFee}</Text>
                    </View>
                    <View className='statis-a'>
                      <Text>提成总金额：</Text>
                      <Text>{item.rateMoney}</Text>
                    </View>
                  </View>
                  <View style='margin-left:30rpx;'>
                    <View className='statis-a'>
                      <Text>总客户数：</Text>
                      <Text>{item.customerNum}</Text>
                    </View>
                    <View className='statis-a'>
                      <Text>提成比例：</Text>
                      <Text>{item.rateText}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}


        </View>
      </Block>
    );
  }
}
