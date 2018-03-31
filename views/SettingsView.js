import React from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native'
import BackgroundImage from '../common/BackgroundImage'
import LoginView from '../common/LoginView'
import Button from '../common/Button'
import { setUsername, setPassword } from '../services/dataHandler'

export default class SettingsView extends React.Component {
    constructor(props) {
        super(props);
    }

    showLogout = () => {
        return (this.props.isLoggedIn ? <Button text='Logout' onPress={this.props.onLogout} /> : <LoginView />)
    }

    render() {
        return (
            <BackgroundImage>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                    { this.showLogout() }
                </View>
            </BackgroundImage>
        )
    }
}