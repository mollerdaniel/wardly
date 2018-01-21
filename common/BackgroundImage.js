import React from 'react'
import {Dimensions, ImageBackground, StyleSheet} from 'react-native'

export default class BackgroundImage extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../images/backgroundimage.jpg')}
                style={styles.backgroundImage}>
                {this.props.children}
            </ImageBackground>
        )
    }
}

const dimensions = Dimensions.get('window')

const styles = StyleSheet.create({
backgroundImage: {
    width: dimensions.width,
    height: dimensions.height
  },
})