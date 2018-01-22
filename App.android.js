import React from 'react'
import { View, Text, ViewPagerAndroid } from 'react-native'
import StartView from './views/StartView'
import BackgroundImage from './common/BackgroundImage'

export default class App extends React.Component {
  render() {
    return (
      <ViewPagerAndroid
        style={{ flex: 1 }}
        initialPage={1}>
        <View style={{ alignItems: 'center' }} key="1">
          <BackgroundImage>
            <Text style={{color: 'white'}}>First page</Text>
          </BackgroundImage>
        </View>
        <View style={{ alignItems: 'center' }} key="2">
          <StartView />
        </View>
        <View style={{ alignItems: 'center' }} key="3">
          <BackgroundImage>
            <Text style={{color: 'white'}}>Last page</Text>
          </BackgroundImage>
        </View>
      </ViewPagerAndroid>
    )
  }
}