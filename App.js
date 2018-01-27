import React from 'react'
import { View, Text, StyleSheet, BackAndroid } from 'react-native'
import StartView from './views/StartView'
import Swiper from 'react-native-swiper'
import BackgroundImage from './common/BackgroundImage'

export default class App extends React.Component {


  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={1}>
        <BackgroundImage>
          <Text>Left</Text>
        </BackgroundImage>
          <StartView />
        <BackgroundImage>
          <Text>Right</Text>
        </BackgroundImage>
      </Swiper>
    )
  }
}