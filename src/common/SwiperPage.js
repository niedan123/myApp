import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
export default class SwiperPage extends Component {
  start = () => {
    AsyncStorage.setItem('isInstall', 'true', () => {
      this.props.afterInstall();
    });
  };
  render() {
    return (
      <Swiper showsButtons={true}>
        <View style={styles.slide1}>
          <Image source={require('../../assets/slide.png')} />
        </View>
        <View style={styles.slide1}>
          <Image source={require('../../assets/slide.png')} />
        </View>
        <View style={styles.slide1}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../assets/slide.png')}
          />
          <TouchableOpacity style={styles.start} onPress={this.start}>
            <Text style={{color: '#fff'}}>开始体验</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  start: {
    position: 'absolute',
    bottom: 150,
    width: 100,
    height: 40,
    color: '#fff',
    backgroundColor: 'red',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
