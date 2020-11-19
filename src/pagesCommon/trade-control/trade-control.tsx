import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image,
  Input
} from "@tarojs/components";
import "./trade-control.scss";
import { orderlist } from "@/api/index"

export default class Index extends Component {
  // 店铺详情
  createTrade(id) {
    Taro.navigateTo({
      url: '../store-info/store-info?sid=' + id
    })
  }
  state = {
    imageurl: "https://guyu-1300342109.cos.ap-guangzhou.myqcloud.com",
    pageNum: '1',
    keyword: '',
    datalist: []
  };
  componentDidMount() {
    this.getlist(this.state.pageNum, this.state.keyword)
  }
  getlist = async (pageNum, keyword) => {
    const params = { pageNum: pageNum, pageSize: 20, keyword: keyword }
    const res = await orderlist(params)
    Taro.hideLoading()
    if (res.data.code == 20000) {
      const list = res.data.data.list
      const datalist = this.state.datalist
      list.map(item => {
        datalist.push(item)
      })
      this.setState({ datalist: datalist })
    }
  }

  onReachBottom() {
    this.state.pageNum++;
    Taro.showLoading({ title: '加载中' })
    this.getlist(this.state.pageNum, this.state.keyword)
  }

  getvalue(e) {
    this.setState({ keyword: e.detail.value })
  }
  search() {
    this.setState({ pageNum: 1, datalist: [] })
    this.getlist(1, this.state.keyword)
  }



  config: Config = {
    navigationBarTitleText: "店铺"
  };
  render() {
    const { datalist, imageurl } = this.state
    return (
      <View>
        <View className='content-fixed'>
          <View className="search">
            <Input placeholder='搜索商品名称' onInput={this.getvalue} onConfirm={this.search}></Input>
          </View>
        </View>

        <View style="margin-top:120rpx;">
          {datalist.map(item => {
            return (
              <View className='row-two' onClick={() => { this.createTrade(item.storeId) }}>
                <View className="order-content">
                  <Image src={imageurl + item.storeLogo}></Image>
                  <View className="order-detail">
                    <Text>{item.storeName}</Text>
                    <View className="order-price">
                      <Text className="order-a">状态 {item.statusMsg}</Text>
                    </View>
                  </View>
                </View>
                <View className='qcfont qc-icon-chevron-right'></View>
              </View>
            )
          })}
        </View>
      </View>
    );
  }
}
