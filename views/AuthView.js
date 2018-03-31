import React from 'react';
import { WebView } from 'react-native';

//import secrets from './secrets';

export default class AuthView extends React.Component {
  _onNavigationStateChange = (event) => {
    if (event.url && event.url.indexOf('?token=') > -1) {
        console.log('url: ', event.url)
        let token = event.url.split('?token=')[1]
        console.log('token: ', token)
        this.props.loginCallback(true, token)
    }
  }

  _getURI(service) {
        return 'https://discord.fhog.se/';
  }

  render() {
    return (
      <WebView
        onNavigationStateChange={this._onNavigationStateChange}
        source={{uri: this._getURI()}}
        style={{marginTop: 20}}
      />
    )
  }
}