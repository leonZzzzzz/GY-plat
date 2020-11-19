import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image,
  Input
} from "@tarojs/components";
import "./list.scss";
import { authent, orderBoxList } from "@/api/index"

export default class Index extends Component {

  state = {
    imageurl: "https://guyu-1300342109.cos.ap-guangzhou.myqcloud.com",
    orderNo: '',
    array: [],
    datalist: [],
    pageNum: 1,
    showloading: false
  };
  componentDidMount() {
    Taro.showLoading()
    this.getlist(this.state.pageNum, this.state.orderNo)
  }
  getlist = async (pageNum, orderNo) => {
    const params = { "pageNum": pageNum, "pageSize": 15, "total": 0, "orderNo": orderNo, }
    const res = await orderBoxList(params)
    Taro.hideLoading()
    const datalist = res.data.data.list
    datalist.map(item => {
      item.needRefundAmount = parseFloat(item.needPayAmount / 100).toFixed(2)
      item.orderItems.map(val => {
        val.price = parseFloat(val.price / 100).toFixed(2)
        val.origPrice = parseFloat(val.origPrice / 100).toFixed(2)
        val.nowPrice = parseFloat(val.nowPrice / 100).toFixed(2)
      })
    })
    const array = this.state.array
    datalist.map(item => {
      array.push(item)
    })
    console.log(array)
    this.setState({ datalist: array, showloading: true })
  }
  onReachBottom() {
    this.state.pageNum++;
    this.getlist(this.state.pageNum, this.state.orderNo)
  }

  getvalue(e) {
    this.setState({ orderNo: e.detail.value })
  }
  search() {
    const { orderNo } = this.state
    this.setState({ orderNo, pageNum: 1, datalist: [], array: [], showloading: false })
    this.getlist(1, orderNo)
  }
  config: Config = {
    navigationBarTitleText: "订单列表"
  };
  render() {
    let { datalist, imageurl, showloading } = this.state
    return (
      <View>
        <View className='content-fixed'>
          <View className="search">
            <Input placeholder='搜索订单号' onInput={this.getvalue}></Input>
            <View onClick={this.search}>搜索</View>
          </View>
        </View>
        {showloading && (
          <View style="margin-top:80rpx;">
            {datalist.length > 0 ? (
              <Block>
                {datalist.map(item => {
                  return (
                    <View className="content" key={item.id}>
                      <View className='content-order'>
                        <Text>订单号:{item.orderNo}
                        </Text>
                        <View className='content-time'>
                          <Text>{item.statusName}</Text>
                          <Text>{item.createTime}</Text>
                        </View>
                      </View>
                      <View className='con-list'>
                        {item.orderItems.map(pro => {
                          return (
                            <View className='content-con' key={pro.id} onClick={() => { Taro.navigateTo({ url: '../dispose-refund/dispose-refund?id=' + pro.orderAfterSalesId + '&type=' + curSwiperIdx }) }}>
                              <Image className='order-img' src={imageurl + pro.iconUrl}></Image>
                              <View className="order-detail">
                                <Text>{pro.name}</Text>
                                {pro.spec && (
                                  <View className="order-price">
                                    <Text>{pro.spec}</Text>
                                  </View>
                                )}

                                <View className='order-name'>
                                  <View className="reper">
                                    <Text>￥</Text>
                                    <Text className="repe-a">{pro.price}</Text>
                                  </View>
                                  <Text>x{pro.qty}{pro.unit}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        })}

                      </View>
                      <View className='content-total'>共<Text>{item.afterSalesItemList.length}</Text>件商品
                    <Text style='margin-left:10rpx;'>
                          {/* 物流服务费￥{item.transportAmount} */}
                      合计￥{item.needRefundAmount}</Text>
                      </View>
                      <View className='order-pro'>
                        <View className='order-user'>
                          {/* <Image src={item.buyerHeader}></Image> */}
                          <Text>{item.buyerName}</Text>
                          <Text>({item.buyerMobile})</Text>
                        </View>
                        <View className='order-btn'>
                          <Text onClick={() => { Taro.navigateTo({ url: '../remark/remark?id=' + item.orderId }) }}>卖家备注</Text>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </Block>
            ) : (
                <View className="no-data-view">
                  <Image
                    src={require("../../images/item/qt_89.png")}
                    mode="widthFix"
                    className="no-data-image"
                  ></Image>
                  <View className="no-data-text">
                    此分类没有数据
                    </View>
                </View>
              )}
          </View>
        )}

      </View>
    );
  }
}
