import React from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native'

export default class QueueList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          queue: props.waitingPlayers
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            queue: nextProps.waitingPlayers
        })
    }

    render() {
        return (
            <View style={styles.scrollArea2}>
                <ScrollView>
                    {this.state.queue.map((name) => <Text key={name} style={styles.playerList}>{name}</Text>)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    playerList: {
        color: 'red',
        fontSize: 18
    },
    scrollArea2: {
     maxHeight: 65, //Makes the 2nd list Rougly 3 players long. 
       backgroundColor: 'rgba(0,0,0,0)'
    }
})
