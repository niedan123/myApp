/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';
import {myFetch} from '../utils';
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pwd: '',
    };
  }
  userhandle = text => {
    this.setState({username: text});
  };
  pwdhandle = text => {
    this.setState({pwd: text});
  };
  register = () => {
    myFetch
      .post('/login', {
        username: this.state.username,
        pwd: this.state.pwd,
      })
      .then(res => {
        AsyncStorage.setItem('user', JSON.stringify(res.data));
      })
      .then(() => {
        <View>
          <Text style={{marginTop: 30}}>正在登录。。。</Text>
        </View>;
        Actions.login();
      });
  };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red" />
            <TextInput placeholder="用户名" onChangeText={this.userhandle} />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red" />
            <TextInput
              onChangeText={this.pwdhandle}
              placeholder="密码"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 40,
              marginTop: 30,
              backgroundColor: '#ccc',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
            onPress={this.register}>
            <Text>注册</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
