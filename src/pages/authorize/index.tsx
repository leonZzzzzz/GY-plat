import Taro, { Component, Config } from '@tarojs/taro';
import { Block, View, Text, Image, Input, Swiper, SwiperItem, Navigator } from '@tarojs/components';
import './index.scss';
import { userlogin } from '@/api/login';

export default class Index extends Component {
  state = {
    phone: '',
    password: '',
    name: ''
  };
  config: Config = {
    navigationBarTitleText: '丰盈鲜生平台'
  };

  getName(e) {
    this.setState({ name: e.detail.value });
  }
  getPasswd(e) {
    this.setState({ password: e.detail.value });
  }
  login() {
    const { name, password } = this.state;
    const params = { username: name, password };
    this.reg(params);
  }
  reg = async params => {
    const res = await userlogin(params);
    if (res.data.code == 20000) {
      Taro.setStorageSync('sessionId', res.data.data.SESSION)
      Taro.redirectTo({
        url: '../home/index'
      });
    }
  };
  render() {
    return (
      <View style='flex-direction:column;border-top:1px solid #eee;'>
        <View className='logo'>
          <Image src={require('../../images/item/logo-v.png')}></Image>
        </View>
        <View className='input-content'>
          <View className='input-row'>
            <Image src={require('../../images/item/username.png')}></Image>
            <Input placeholder='请输入账号' onInput={this.getName}></Input>
          </View>
          <View className='input-row'>
            <Image src={require('../../images/item/passward.png')}></Image>
            <Input placeholder='请输入密码' onInput={this.getPasswd} type='password'></Input>
          </View>
        </View>
        <View className='btn' onClick={this.login}>
          <Text>登录</Text>
        </View>
      </View>
    );
  }
}
