import React from 'react'
import {Dimensions, Image, StyleSheet} from 'react-native'

export default class BackgroundImage extends React.Component {
    render() {
        return (
            <Image source={require('../images/backgroundimage.jpg')}
                style={styles.backgroundImage}>
                {this.props.children}
            </Image>
        )
    }
}

const dimensions = Dimensions.get('window')

const styles = StyleSheet.create({
backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: dimensions.width,
    height: dimensions.height,
    resizeMode: 'cover'
  },
})