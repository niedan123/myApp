import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
const {width} = Dimensions.get('window');
const goods = [
  {
    title: '账户管理',
    img: 'cog',
  },
  {
    title: '收货地址',
    img: 'train',
  },
  {
    title: '我的信息',
    img: 'address-card-o',
  },
  {
    title: '我的订单',
    img: 'book',
  },
  {
    title: '我的二维码',
    img: 'qrcode',
  },
  {
    title: '我的积分',
    img: 'facebook-square',
  },
  {
    title: '我的收藏',
    img: 'star-o',
  },
];
const goods1 = [
  {
    title: '居家维修保养',
    img: 'gears',
  },
  {
    title: '出行接送',
    img: 'car',
  },
  {
    title: '我的受赠人',
    img: 'user-o',
  },
  {
    title: '我的住宿优惠',
    img: 'bed',
  },
  {
    title: '我的活动',
    img: 'hand-peace-o',
  },
  {
    title: '我的发布',
    img: 'pencil',
  },
];
export default class Userinfor extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('img').then(res => {
      if (JSON.parse(res) != null) {
        this.setState({
          imageUrl: JSON.parse(res),
        });
      } else {
        this.setState({imageUrl: require('../images/作业1/7.jpg')});
      }
    });
  }
  takephoto = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        console.log('Error:', response.error);
      } else if (response.customButton) {
        console.log('custom:', response.customButton);
      } else {
        const source = {uri: response.uri};
        AsyncStorage.setItem('img', JSON.stringify(source)).then(res => {
          console.log('保存成功');
        });
        this.setState({
          imageUrl: source,
        });
      }
    });
  };
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.header}>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => {
                  this.takephoto();
                }}>
                <Image
                  style={{width: 103, height: 107, borderRadius: 50}}
                  source={this.state.imageUrl}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 20, marginTop: 20, color: '#fff'}}>
                BINNU DHILLON
              </Text>
            </View>
          </View>
          <View style={styles.box1}>
            <Icon size={15} name="street-view" style={{marginTop: 2}} />
            <Text style={{fontSize: 15, marginLeft: 20, color: '#333'}}>
              我的个人中心
            </Text>
          </View>
          <FlatList
            style={{backgroundColor: '#fff', marginTop: 10}}
            data={goods}
            numColumns={3}
            renderItem={({item}) => (
              <View style={styles.good}>
                <Icon size={15} name={item.img} />
                <Text style={{marginTop: 10, fontSize: 15, color: '#333'}}>
                  {item.title}
                </Text>
              </View>
            )}
          />
          <View style={styles.box1}>
            <Icon size={15} name="bookmark-o" style={{marginTop: 2}} />
            <Text style={{fontSize: 15, marginLeft: 20, color: '#333'}}>
              E族活动
            </Text>
          </View>
          <FlatList
            style={{backgroundColor: '#fff', marginTop: 10}}
            data={goods1}
            numColumns={3}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.good}
                onPress={() => {
                  if (index === 5) {
                    Actions.publish();
                  }
                }}>
                <Icon size={15} name={item.img} />
                <Text style={{marginTop: 10, fontSize: 15, color: '#444'}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem('isloading', 'false');
                Actions.login();
              }}>
              <Text style={{color: '#f23030'}}>退出登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: '#f23030',
    justifyContent: 'center',
    height: 250,
  },
  box: {
    alignItems: 'center',
  },
  box1: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  good: {
    alignItems: 'center',
    width: '33.3%',
    height: 80,
    justifyContent: 'center',
  },
});
