import React from 'React'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

export default class Button extends React.Component {

    render() {
        return (
            <TouchableHighlight style={styles.buttonBlue} onPress={this.props.onPress}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.whiteText}> {this.props.text}</Text>
                </View>
            </TouchableHighlight>
    )}
}


const styles = StyleSheet.create({
    buttonBlue: {
        alignItems: 'center',
        backgroundColor: '#5CC8FF',
        padding: 10,
        marginBottom: 200,
        width: 150,
    },
    whiteText: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        textShadowColor: 'rgba(1,1,1,1)',
        textShadowOffset: { width: 1, height: 1 },
        fontSize: 22,
    },
})