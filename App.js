import React from 'react'
import { View, Text, StyleSheet, BackAndroid } from 'react-native'
import StartView from './views/StartView'
import EventView from './views/EventView'
import SettingsView from './views/SettingsView'
import AuthView from './views/AuthView'
import Swiper from 'react-native-swiper'
import BackgroundImage from './common/BackgroundImage'

export default class App extends React.Component {

  choosePage = () => { this.refs.swiper.scrollBy(1,false) }

  render() {
    return (
      <Swiper ref='swiper'
        loop={false}
        showsPagination={false}
        index={1}>
        <EventView />
        <StartView onPressFunction={this.choosePage}/>
        <SettingsView/>
        <AuthView/>


      </Swiper>
    )
  }
}