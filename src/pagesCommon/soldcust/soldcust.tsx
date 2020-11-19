import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image,
  Input
} from "@tarojs/components";
import "./soldcust.scss";
import { authent } from "@/api/index"

export default class Index extends Component {

  state = {
    imageurl: "https://guyu-1300342109.cos.ap-guangzhou.myqcloud.com",
    mobile: '',
    array: [],
    datalist: [],
    pageNum: 1
  };
  componentDidMount() {
    this.getlist(this.state.pageNum, this.state.mobile)
  }
  getlist = async (pageNum, mobile) => {
    const params = { "pageNum": pageNum, "pageSize": 15, "total": 0, "mobile": mobile }
    const res = await authent(params)
    const datalist = res.data.data.list
    const array = this.state.array
    datalist.map(item => {
      array.push(item)
    })
    this.setState({ datalist: array })
  }
  onReachBottom() {
    this.state.pageNum++;
    this.getlist(this.state.pageNum, this.state.mobile)
  }

  getvalue(e) {
    this.setState({ mobile: e.detail.value })
  }
  search() {
    const { mobile } = this.state
    this.setState({ mobile, pageNum: 1, datalist: [], array: [] })
    this.getlist(1, mobile)
  }
  config: Config = {
    navigationBarTitleText: "客户"
  };
  render() {
    let {datalist} = this.state
    return (
      <Block>
        <View className='cust-fixed'>
          <View className="search">
            <Input placeholder='搜索手机号' onInput={this.getvalue} onConfirm={this.search}></Input>
          </View>

        </View>
        <View className='content'>
          {datalist.map(item => {
            return (
              <View className='content-a'>
                <View className='content-a-name'>
                  <Image className='content-a-name-pic' src={item.headImage}></Image>
                  <View>
                    <View className='content-a-name-user'>{item.name}<Text className='content-a-name-user-t'>{item.typeMsg}</Text></View>
                    <View className='content-a-name-phone'>{item.phone}</View>
                  </View>
                </View>
                <View className='content-statis'>
                  <View className='left'>
                    <View className='statis-a'>
                      <Text>账户余额：</Text>
                      <Text>{item.account}</Text>
                    </View>
                    <View className='statis-a'>
                      <Text>成交订单：</Text>
                      <Text>{item.orderNumber}</Text>
                    </View>
                  </View>
                  <View style='margin-left:30rpx;'>
                    <View className='statis-a'>
                      <Text>成交金额：</Text>
                      <Text>{item.orderMoney}</Text>
                    </View>
                    <View className='statis-a'>
                      <Text>账期金额：</Text>
                      <Text>{item.creditMoney}</Text>
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
