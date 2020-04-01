/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
const {width} = Dimensions.get('window');
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
      return <Text style={{color: 'red', fontSize: 15}}>已回复</Text>;
    } else {
      return <Text style={{fontSize: 15}}>待回复</Text>;
    }
  };
  render() {
    return (
      <ScrollView style={{width: width}}>
        <View>
          <View style={styles.header}>
            <Icon
              style={{marginLeft: width * 0.03125}}
              onPress={() => {
                Actions.pop();
              }}
              size={17}
              color="#fff"
              name="chevron-left"
            />
            <Text style={styles.title}>我的发布</Text>
            <Icon
              style={{marginLeft: width * 0.32}}
              size={17}
              color="#fff"
              name="ellipsis-h"
            />
          </View>
          <View style={{width: width}}>
            {/* 状态栏 */}
            {this.state.tits.map(item => (
              <View style={styles.list}>
                <Text style={{fontSize: 15, width: width * 0.6, marginLeft: 5}}>
                  {item.title
                    ? item.title.length > 15
                      ? item.title.substr(0, 15) + '...'
                      : item.title
                    : ''}
                </Text>
                <Text style={{fontSize: 15, width: width * 0.25}}>
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: '#f23030',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  title: {
    marginLeft: width * 0.35,
    color: '#fff',
    fontSize: 17,
  },
  list: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
  },
  btn: {
    width: width * 0.25,
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
    width: width * 0.3,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 30,
  },
});
