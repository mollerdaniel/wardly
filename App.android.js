import React from 'react'
import {View, Text, ViewPagerAndroid} from 'react-native'
import StartView from './views/StartView'

export default class App extends React.Component {
  render() {
    return (
      <ViewPagerAndroid
        style={{flex: 1}}
        initialPage={1}>
        <View style={{alignItems: 'center'}} key="1">
          <Text>First page</Text>
        </View>
        <View style={{alignItems: 'center'}} key="2">
          <StartView />
        </View>
        <View style={{alignItems: 'center'}} key="3">
          <Text>Last page</Text>
        </View>
      </ViewPagerAndroid>
    )
  }
}