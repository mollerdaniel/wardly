import React from 'react';
import {Alert, Button, Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import BackgroundImage from './common/BackgroundImage/';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {count: 0}
  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

  render() {
    return (
      <BackgroundImage>
        <View style={styles.buttonContainer}>
          <View style={styles.countContainer}>
          <Text style={styles.countText}> {this.state.count} / 5 players </Text>
          </View>
          <TouchableHighlight style={styles.buttonBlue} onPress={this.onPress}>
          <Text style={styles.whiteText}> +1 CS:GO </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonYellow}>
          <Text style={styles.blackText}> Settings </Text>
          </TouchableHighlight>
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
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    marginBottom: '20%',
  },
  csgologoImage: {
    width: dimensions.width * 0.75,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  whiteText: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 15,
  },
  blackText: {
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 15,
  },  
  buttonBlue: {
    alignItems: 'center',
    backgroundColor: '#5CC8FF',
    padding: 10,
    width: 150,
    marginBottom: 20,
  },
  buttonYellow: {
    alignItems: 'center',
    backgroundColor: '#FFE74C',
    padding: 10,
    width: 150,
    marginBottom: 20,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  }
});
