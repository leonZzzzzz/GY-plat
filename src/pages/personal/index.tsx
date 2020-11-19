import Taro, { useDidShow, useState } from "@tarojs/taro";
import { View, Text, Image, Form, Button } from "@tarojs/components";
import { QcMenuCard } from "@/components/common";
// import { getOrderStatus } from "@/api/order";
import "./index.scss";
// import { getCartNum } from "@/api/cart";
import { userInfo } from "@/api/common";


let orderCount = [
  {
    id: 0,
    title: "待支付",
    icon: "qc-icon-qianbao",
    count: 0,
    url: "/pagesMall/order/list/index?type=0"
  },
  {
    id: 1,
    title: "待发货",
    icon: "qc-icon-daifahuo",
    count: 0,
    url: "/pagesMall/order/list/index?type=1"
  },
  {
    id: 2,
    title: "待收货",
    icon: "qc-icon-daishouhuo",
    count: 0,
    url: "/pagesMall/order/list/index?type=2"
  },
  {
    id: 10,
    title: "已完成",
    icon: "qc-icon-yiwancheng",
    count: 0,
    url: "/pagesMall/order/list/index?type=10"
  },
  {
    id: 4,
    title: "售后",
    icon: "qc-icon-shouhou",
    count: 0,
    url: "/pagesMall/after/list-sales-order/index"
  }
];

const serveGroup = [
  {
    id: 8,
    title: "店铺信息",
    url: "../../pagesInfo/store-info/store-info",
    icon: "../../images/myicon/gy-icon_20.png"
  },
  {
    id: 8,
    title: "配送方式",
    url: "../../pagesInfo/distway/distway",
    icon: "../../images/myicon/guyu-me-6.png"
  },
  {
    id: 8,
    title: "退货地址",
    url: "../../pagesInfo/salesite/salesite",
    icon: "../../images/myicon/guyu-me-7.png"
  },
  {
    id: 8,
    title: "关于我们",
    url: "../../pagesInfo/aboutUs/aboutUs",
    icon: "../../images/myicon/guyu-me-9.png"
  },
  {
    id: 8,
    title: "设置",
    url: "../../pagesInfo/setting/setting",
    icon: "../../images/myicon/shezhi.png"
  },
];

function Personal() {
  const [user, setUser] = useState<any>();
  const [orderCountGroup, setOrderCountGroup] = useState<any[]>(orderCount);
  const [cartCount, setCartCount] = useState<number>(0);
  const [memberId, setMemberId] = useState<string>("");
  useDidShow(() => {
    const memberId = Taro.getStorageSync("memberId");
    if (memberId) {
      setMemberId(memberId);
      apiGetOrderStatus();
      apiGetCartNum();
      apiUserInfo();
    }
  });

  async function apiUserInfo() {
    const res = await userInfo();
    setUser(res.data.data);
  }

  async function apiGetCartNum() {
    const res = await getCartNum();
    console.log('175', res)
    setCartCount(res.data.data.qty);
  }

  async function apiGetOrderStatus() {
    const res = await getOrderStatus();
    const {
      afterSaleQuantity,
      finishQuantity,
      undeliveredQuantity,
      unpaidQuantity,
      unreceivedQuantity
    } = res.data.data;
    orderCountGroup[0].count = unpaidQuantity;
    orderCountGroup[1].count = undeliveredQuantity;
    orderCountGroup[2].count = unreceivedQuantity;
    orderCountGroup[3].count = finishQuantity;
    orderCountGroup[4].count = afterSaleQuantity;
    setOrderCountGroup(orderCountGroup);
  }
  return (
    <View className="personal">
      <View className="circle"></View>
      <View className="personal-content">
        <View className="personal-content__user">
          {memberId ? (
            <View className="personal-content__user-info">
              <Image
                src={user.headImage}
                className="personal-content__user-img"
              ></Image>
              <View className="personal-content__user-name">
                <Text>Naomizz</Text>
                <Text>{user.appellation}</Text>
              </View>
            </View>
          ) : (
              <View
                className="personal-content__user-info"
                onClick={() => {
                  Taro.navigateTo({ url: "/pages/authorize/index" });
                }}>
                <View className="personal-content__user-img"></View>
                <View className="personal-content__user-name">立刻登陆</View>
              </View>
            )}

          <View className='cash'>
            <Text>缴纳年费和保证金后可使用全部功能</Text>
            <Text>去支付 ></Text>
          </View>
        </View>
      </View>

      {/* <QcMenuCard> */}
      <View className="my-detail-msg">
        <View className="my-detail-gro">
          {serveGroup.map((item: any) => {
            return (
              <View
                className="my-gro-img"
                key={item.id}
                onClick={() => {
                  Taro.navigateTo({
                    url: item.url
                  });
                }}
              >
                <View className='row'>
                  <Image src={item.icon}></Image>
                  {/* <View className={`qcfont ${item.icon}`} /> */}
                  <View>{item.title}</View>
                </View>
                <Text className="image-one qc-menu-card__icon qcfont qc-icon-chevron-right" />
              </View>
            );
          })}
        </View>
      </View>

      <View className="my-detail-gro">
        <View className="my-gro-img borno" onClick={() => { Taro.navigateTo({ url: '../../pagesInfo/referrer/referrer' }) }}>
          <View className='row'>
            <Image src={require('../../images/myicon/shezhi.png')}></Image>
            {/* <View className={`qcfont ${item.icon}`} /> */}
            <View>推荐新档口获得平台奖励</View>
          </View>
          <Text className="image-one qc-menu-card__icon qcfont qc-icon-chevron-right" />
        </View>
      </View>
      {/* </QcMenuCard> */}
    </View>
  );
}
Personal.config = {
  navigationBarTitleText: "个人中心"
};
export default Personal;
