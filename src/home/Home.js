/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
const goods = [
  {
    img: require('../images/作业1/3.jpg'),
    title: '居家维修保养',
    img2: 'angle-right',
  },
  {
    img: require('../images/作业1/4.jpg'),
    title: '住宿优惠',
    img2: 'angle-right',
  },
  {
    img: require('../images/作业1/5.jpg'),
    title: '出行接送',
    img2: 'angle-right',
  },
  {
    img: require('../images/作业1/6.jpg'),
    title: 'E族活动',
    img2: 'angle-right',
  },
];
export default class Home extends Component {
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.header}>
            <View style={styles.search}>
              <Icon
                style={{marginLeft: 10}}
                color={'#fff'}
                size={20}
                name="search"
              />
              <TextInput
                placeholderTextColor="#fff"
                fontColoe="#fff"
                placeholder="请输入您要搜索的关键字"
                style={{
                  width: 0.77 * width,
                  padding: 0,
                  paddingLeft: 10,
                }}
              />
              <Icon color={'#fff'} size={25} name="shopping-cart" />
            </View>
          </View>
          <View style={{height: 200}}>
            <Swiper
              horizontal={true}
              showsPagination={true}
              dotColor="white"
              activeDotColor="red"
              autoplay={true}>
              <View style={styles.slide}>
                <Image
                  style={{width: '100%', height: 200}}
                  source={{
                    uri:
                      'http://file.yuansuxi.com/hj/1499328192351_600x219.jpg',
                  }}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  style={{width: '100%', height: 200}}
                  source={{
                    uri:
                      'http://photocdn.sohu.com/20151203/mp46238016_1449143773501_2_th.jpeg',
                  }}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  style={{width: '100%', height: 200}}
                  source={{
                    uri:
                      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585586493605&di=22bb0d692ef11148224502a26446af64&imgtype=0&src=http%3A%2F%2Fpic.16pic.com%2F00%2F51%2F04%2F16pic_5104870_b.jpg',
                  }}
                />
              </View>
            </Swiper>
          </View>
          <FlatList
            data={goods}
            renderItem={({item}) => (
              <View style={styles.box}>
                <Image resizeMode="contain" source={item.img} />
                <Text style={styles.test}>{item.title}</Text>
                <Icon
                  size={20}
                  style={{marginLeft: 0.35 * width}}
                  name={item.img2}
                />
              </View>
            )}
          />
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: '50%',
                height: 40,
                backgroundColor: 'red',
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                AsyncStorage.setItem('isloading', 'false');
                Actions.login();
              }}>
              <Text style={{color: '#fff'}}>退出登录</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#ccc'}}>@E族之家，版权所有</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 70,
    backgroundColor: '#f23030',
    justifyContent: 'center',
  },
  search: {
    marginLeft: 0.05 * width,
    borderRadius: 50,
    width: width * 0.77,
    height: 40,
    backgroundColor: '#ffcccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  slide: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: width,
    height: 80,
    paddingLeft: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  test: {
    fontSize: 15,
    marginLeft: 40,
    color: '#333',
    width: 300,
  },
});
