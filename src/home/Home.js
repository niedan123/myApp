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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
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
                width: 370,
                padding: 0,
                paddingLeft: 10,
              }}
            />
            <Icon color={'#fff'} size={25} name="shopping-cart" />
          </View>
        </View>
        <View>
          <Image
            style={{width: '100%', height: 240}}
            source={require('../images/作业1/新客专享.jpg')}
          />
        </View>
        <FlatList
          data={goods}
          renderItem={({item}) => (
            <View style={styles.box}>
              <Image resizeMode="contain" source={item.img} />
              <Text style={styles.test}>{item.title}</Text>
              <Icon size={20} name={item.img2} />
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
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#f23030',
    justifyContent: 'center',
  },
  search: {
    marginLeft: 25,
    borderRadius: 50,
    width: 370,
    height: 40,
    backgroundColor: '#ffcccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
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
