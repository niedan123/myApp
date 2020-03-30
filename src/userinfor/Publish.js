/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
export default class Publish extends Component {
  constructor() {
    super();
    this.state = {
      tits: [],
      page: 1,
      time: [],
    };
  }
  componentDidMount() {
    fetch('https://cnodejs.org/api/v1/topics?limit=10&page=' + this.state.page)
      .then(res => res.json())
      .then(res => {
        this.setState({tits: res.data});
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      fetch(
        'https://cnodejs.org/api/v1/topics?limit=10&page=' + this.state.page,
      )
        .then(res => res.json())
        .then(res => {
          this.setState({tits: res.data});
        });
    }
  }
  pre = () => {
    this.setState({
      page: this.state.page - 1,
    });
  };
  later = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };
  response = () => {
    let rannum = parseInt(Math.random() * 2);
    if (rannum == 1) {
      return <Text style={{color: 'red'}}>已回复</Text>;
    } else {
      return <Text>待回复</Text>;
    }
  };
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Icon
            style={{marginLeft: 15}}
            onPress={() => {
              Actions.pop();
            }}
            size={20}
            color="#fff"
            name="chevron-left"
          />
          <Text style={styles.title}>我的发布</Text>
          <Icon
            style={{marginLeft: 160}}
            size={20}
            color="#fff"
            name="ellipsis-h"
          />
        </View>
        <View>
          {/* 状态栏 */}
          {this.state.tits.map(item => (
            <View style={styles.list}>
              <Text numberOfLines={2} style={{fontSize: 17, width: 290}}>
                {item.title
                  ? item.title.length > 15
                    ? item.title.substr(0, 15) + '...'
                    : item.title
                  : ''}
              </Text>
              <Text style={{fontSize: 17, width: 120}}>
                {item.create_at.substr(0, 10)}
              </Text>
              {this.response()}
            </View>
          ))}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Text
                style={styles.btn}
                onPress={() => {
                  if (this.state.page > 1) {
                    this.pre();
                  } else {
                    ToastAndroid.show('当前已处于第一页', ToastAndroid.SHORT);
                  }
                }}>
                上一页
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>第{this.state.page}页</Text>
            <TouchableOpacity>
              <Text
                style={styles.btn}
                onPress={() => {
                  this.later();
                }}>
                下一页
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f23030',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  title: {
    marginLeft: 170,
    color: '#fff',
    fontSize: 20,
  },
  list: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 120,
    backgroundColor: 'red',
    height: 40,
    borderRadius: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    marginTop: 30,
    marginLeft: 30,
  },
  text: {
    fontSize: 20,
    width: 150,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 30,
  },
});
