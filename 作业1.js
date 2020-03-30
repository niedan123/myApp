/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  BackHandler,
  ToastAndroid,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  Overlay,
  Router,
  Scene,
  Tabs,
  Modal,
  Lightbox,
  Actions,
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Goods from './src/goods/Good';
import Home from './src/home/Home';
import Userinfor from './src/userinfor/Userinfor';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import Publish from './src/userinfor/Publish';
import Register from './src/common/Register';
console.disableYellowBox = true;
const styles = StyleSheet.create({});
const App = () => {
  let [isLogin, setLogin] = useState(false);
  let [isInstall, setInstall] = useState(true);
  let now = 0;
  let init = () => {
    AsyncStorage.getItem('isInstall').then(res => {
      if (res) {
        setInstall(false);
      }
    });
    AsyncStorage.getItem('user').then(res => {
      let user = JSON.parse(res);
      console.log(user);
      if (!user) {
        SplashScreen.hide();
      }
      if (user && user.token) {
        setLogin(true);
        SplashScreen.hide();
      }
    });
  };
  useEffect(() => {
    init();
  }, []);
  let afterInstall = () => {
    setInstall(false);
  };
  if (isInstall) {
    return (
      <View style={{flex: 1}}>
        <SwiperPage afterInstall={afterInstall} />
      </View>
    );
  }
  //实现Tabs
  return (
    <Router
      backAndroidHandler={() => {
        if (Actions.currentScene !== 'home') {
          Actions.pop();
          return true;
        } else if (Actions.currentScene === 'home') {
          if (new Date().getTime() - now < 2000) {
            BackHandler.exitApp();
          } else {
            ToastAndroid.show('确定要退出吗', 100);
            now = new Date().getTime();
            return true;
          }
        }
      }}>
      <Overlay>
        <Modal key="modal" hideNavBar>
          <Lightbox key="lightbox">
            <Scene key="root">
              <Tabs
                key="tabbar"
                hideNavBar
                tabBarStyle={{backgroundColor: '#fff'}}
                activeTintColor="red"
                inactiveTintColor="gray">
                <Scene
                  hideNavBar
                  key="homePage"
                  title="首页"
                  icon={({focused}) => (
                    <Icon
                      color={focused ? 'red' : 'gray'}
                      name="home"
                      size={25}
                    />
                  )}>
                  <Scene key="home" component={Home} />
                </Scene>
                <Scene
                  hideNavBar
                  key="产品分类"
                  icon={({focused}) => (
                    <Icon
                      size={25}
                      color={focused ? 'red' : 'gray'}
                      name="dropbox"
                    />
                  )}>
                  <Scene key="产品分类" component={Goods} />
                </Scene>
                <Scene
                  hideNavBar
                  key="个人中心"
                  icon={({focused}) => (
                    <Icon
                      size={25}
                      color={focused ? 'red' : 'gray'}
                      name="user-o"
                    />
                  )}>
                  <Scene key="个人中心" component={Userinfor} />
                  <Scene hideNavBar key="publish" component={Publish} />
                </Scene>
              </Tabs>
            </Scene>
          </Lightbox>
          <Scene initial={!isLogin} key="login" component={Login} />
          <Scene key="register" component={Register} />
        </Modal>
      </Overlay>
    </Router>
  );
};
export default App;
