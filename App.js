import React from 'react'
import { View, Text, StyleSheet, BackAndroid } from 'react-native'
import StartView from './views/StartView'
import EventView from './views/EventView'
import SettingsView from './views/SettingsView'
import AuthView from './views/AuthView'
import Swiper from 'react-native-swiper'
import BackgroundImage from './common/BackgroundImage'
import getUserData from './services/discord'

export default class App extends React.Component {
  constructor(props) {
    super(props)
        this.state = {
            isLoggedIn: false
        }
  }

  setLoginState = (isLoggedIn, token) => {
    this.setState({
      isLoggedIn: isLoggedIn,
      token: token
    })
    console.log('state set, token: ', token)
  }
  getUserData = async () => {
    console.log('getting user data from app.js')
    const userData = await getUserData(this.state.token)
    return userData
  }

  logout = () => {
    this.setState({
      isLoggedIn: false
    })
  }

  showLoginView = () => {
    return (
      this.state.isLoggedIn ? <StartView getUserData={this.getUserData} onPressFunction={this.choosePage}/> : <AuthView loginCallback={this.setLoginState}/>
    )
  }

  choosePage = () => { this.refs.swiper.scrollBy(1,false) }


  render() {
    return (
      <Swiper ref='swiper'
        loop={false}
        showsPagination={false}
        index={1}>
        <EventView />
        {this.showLoginView()}
        <SettingsView 
          isLoggedIn={this.state.isLoggedIn}
          onLogout={this.logout}
        />
      </Swiper>
    )
  }
}