import React from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native'
import Button from '../common/Button'
import { setUsername, setPassword } from '../services/dataHandler'

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Username',
            password: 'Password',
        };
    }

    onLogin = () => {
        setUsername(this.state.username)
    }

    render() {
        return (
            <View>
                <Text style={styles.infoText}> Discord Username:</Text>

                <View style={styles.container}>
                    <TextInput
                        style={{ flexDirection: 'column', height: 40, width: 200, borderColor: 'gray', borderWidth: 2 }}
                        onChangeText={(username) => this.setState({ username })}
                        clearTextOnFocus
                        value={this.state.username}
                    />
                </View>
                <Text style={styles.infoText}> Discord Password:</Text>
                <View style={styles.container}>
                    <TextInput
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry
                        clearTextOnFocus
                        value={this.state.password}
                    />
                </View>
                <Button text='Login' onPress={this.onLogin} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginBottom: 30,
        backgroundColor: '#ffffff',
    },
    infoText: {
        marginRight: 70,
        textAlign: 'left',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        textShadowColor: 'rgba(1,1,1,1)',
        textShadowOffset: { width: 1, height: 1 },
        fontSize: 15,
    },
    whiteText: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        textShadowColor: 'rgba(1,1,1,1)',
        textShadowOffset: { width: 1, height: 1 },
        fontSize: 22,
    },
    buttonGray: {
        alignItems: 'center',
        backgroundColor: '#C0C0C0',
        padding: 10,
        marginBottom: 20,
        width: 150,
    },
})

