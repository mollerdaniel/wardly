import React from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native'

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          names: props.players
        }
        console.log('got players', props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            names: nextProps.players
        })
    }

    render() {
        return (
            <View style={styles.scrollArea}>
                <ScrollView>
                    {this.state.names.map((name) => <Text key={name} style={styles.playerList}>{name}</Text>)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    playerList: {
        color: 'white',
        fontSize: 18
    },
    scrollArea: {
       maxHeight: 120,
    }
})
