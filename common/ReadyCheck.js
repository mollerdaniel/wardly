import React from 'react'
import { Dimensions, Image, StyleSheet, View, Button, TouchableHighlight, Text } from 'react-native'
import PopupDialog from 'react-native-popup-dialog'


const dimensions = Dimensions.get('window');
const styles = StyleSheet.create({
    readyCheck: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        marginBottom: '20%',
    },
    popupContainer: {
        width: '100%',
        height: '100%',

    },
    whiteText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
    },
    readyText: {
        //flex: 1,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    navigationisNotReadyButton: {
        flex: 1,
        //flexDirection: 'row',
        //width: '30%',
        //height: '50%',
        //alignItems: 'right',
        backgroundColor: '#ff0000',
    },
    navigationisReadyButton: {
        //width: '20%',
        //height: '50%',
        flex: 1,
        backgroundColor: '#00ff00',
    },
})

export default class ReadyCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = { readyOrNot: 'Not Ready' }
    }

    isReady = () => {
        this.setState({
            readyOrNot: 'Ready'
        })
        this.popupDialog.dismiss();
    }
    isNotReady = () => {
        this.setState({
            readyOrNot: 'Not Ready'
        })
        this.popupDialog.dismiss();
    }
    render() {
        return (
            <View style={styles.readyCheck}>

                <Text style={styles.readyText}> You Are: {this.state.readyOrNot}  </Text>
                <Button
                    title="Ready Check!"
                    onPress={() => {
                        this.popupDialog.show();
                    }}
                />
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                >

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TouchableHighlight style={styles.navigationisReadyButton} onPress={this.isReady}>
                            <Text style={styles.whiteText}> Ready! </Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.navigationisNotReadyButton} onPress={this.isNotReady}>
                            <Text style={styles.whiteText}> Not Ready! </Text>
                        </TouchableHighlight>
                    </View>
                </PopupDialog>
            </View>
        );
    }

}