import React from 'react';
import { Alert, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

class BackgroundImage extends React.Component {
  render() {
      return (
          <Image source={require('./images/backgroundimage.jpg')}
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
        <View style={styles.container}>
        <Text style={styles.normalText}>TEST</Text>
        </View>

        <Image
        source={require('./images/csgologo.png')}
        style={styles.csgologoImage}>
        </Image>

      </BackgroundImage>
    );
  }
}

const resizeMode = 'contain';
const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
  },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: dimensions.width,
        height: dimensions.height,
        resizeMode: 'cover'
  },
    csgologoImage: {
        width: dimensions.width * 0.75,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
  },
  normalText: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 20,
  }
});
