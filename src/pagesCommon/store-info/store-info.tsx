import Taro, { Component, Config } from "@tarojs/taro";
import {
  Block,
  View,
  Text,
  Image,
  Input
} from "@tarojs/components";
// import { uploadpic } from "@/api/store";
import { orderDetail } from "@/api/index";
import "./store-info.scss";

export default class Index extends Component {

  state = {
    imageurl: "https://guyu-1300342109.cos.ap-guangzhou.myqcloud.com",
    info: false,
    photos: [],
    pics: [],
    isShow: true,
    ischeck: true,
    startTime: '',
    srartTxt: true,
    endTime: '',
    endTxt: true,
    sid: '',
    infolist: []
  };
  config: Config = {
    navigationBarTitleText: "店铺信息"
  };
  componentDidMount() {
    let sid = this.$router.params.sid
    console.log(sid)
    this.setState({ sid: sid })
    this.getlist(sid)
  }
  getlist = async (storeId) => {
    console.log(999999)
    const res = await orderDetail(storeId)
    if (res.data.code == 20000) {
      this.setState({ infolist: res.data.data })
    }
  }


  // 选择接单时间
  onDateChange(e) {
    console.log(e)
    this.setState({ startTime: e.detail.value, srartTxt: false })
  }
  onendDateChange(e) {
    this.setState({ endTime: e.detail.value, endTxt: false })
  }
  oncheckinfo() {
    this.setState({ ischeck: false })
  }
  uploadLoader = async () => {
    var a = this.state.pics[0]
    var imageByte = decoder.decodeBuffer(a);
    console.log(imageByte)
    const params: object = {
      file: this.state.pics
    };
    const res = await uploadpic(params);
    this.setState({
      list: res.data.subjects
    });
  }

  render() {
    let {imageurl, infolist} = this.state
    return (
      <Block>
        <View className='set'>
          <View className='set-title'>企业信息</View>
          <View className='set-row'>
            <Text>店铺头像</Text>
            <Image className='pic' src={imageurl + infolist.storeLogo}></Image>
          </View>
          <View className='set-row'>
            <Text>店铺名称</Text>
            <Text>{infolist.storeNmae}</Text>
          </View>
          <View className='set-row'>
            <Text>企业名称</Text>
            <Text>{infolist.businessName}</Text>
          </View>
          <View className='set-row'>
            <Text>经营种类</Text>
            <Text>{infolist.cateName}</Text>
          </View>
          <View className='set-row'>
            <Text>营业执照</Text>
            <Image className='pic' src={imageurl + infolist.licenseLogo}></Image>
          </View>
          <View className='set-row'>
            <Text>有效期至</Text>
            <Text>{infolist.endData}</Text>
          </View>


          <View className='set'>
            <View className='set-title'>店铺资金</View>
            <View className='set-row'>
              <Text>可提现金额</Text>
              <Text>￥{infolist.withdrawableMoney}</Text>
            </View>
            <View className='set-row'>
              <Text>待结算金额</Text>
              <Text>￥{infolist.settlementMoney}</Text>
            </View>
            <View className='set-row'>
              <Text>待处理提现</Text>
              <Text>￥{infolist.pendingDisposalMoney}</Text>
            </View>
            <View className='set-row'>
              <Text>剩余保证金</Text>
              <Text>￥{infolist.surplusMoney}</Text>
            </View>
          </View>

          <View className='set'>
            <View className='set-title'>基本信息</View>
            <View className='set-row'>
              <Text>接单时间</Text>
              <Text>{infolist.businessTime}</Text>
            </View>
            <View className='set-row'>
              <Text>入驻时间</Text>
              <Text>{infolist.createTime}</Text>
            </View>
            <View className='set-row'>
              <Text>保证金</Text>
              <Text>￥{infolist.deposit}</Text>
            </View>
            <View className='set-row'>
              <Text>店铺地址</Text>
              <Text>{infolist.address}</Text>
            </View>
            <View className='set-row'>
              <Text>联系人</Text>
              <Text>{infolist.linkman}</Text>
            </View>
            <View className='set-row'>
              <Text>联系电话</Text>
              <Text>{infolist.mobile}</Text>
            </View>
            <View className='set-row bottom-mar'>
              <Text>店铺介绍</Text>
              <Text>{infolist.storeInfo}</Text>
            </View>
          </View>

        </View>

      </Block >
    );
  }
}
