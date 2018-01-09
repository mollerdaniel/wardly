import React from 'react';
import { Alert, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

class BackgroundImage extends React.Component {
  render() {
      return (
          <Image source={require('./backgroundimage.jpg')}
                style={styles.backgroundImage}>

                {this.props.children}

          </Image>
      );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <BackgroundImage>
        <Text style={styles.normalText}>TEST</Text>
      </BackgroundImage>
    );
  }
}

const resizeMode = 'contain';
const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  csgologoImage: {
    width: Math.round(dimensions.width * 0.75),
    height: 200,
    resizeMode: 'contain',
  },
  normalText: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 20,
  }
});
