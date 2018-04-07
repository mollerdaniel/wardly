import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomDatePicker from '../common/CustomDatePicker'
import BackgroundImage from '../common/BackgroundImage'
import { getEvents } from '../services/dataHandler'
import SignUpAnimation from '../animations/SignUpAnimation'
import SignedUpAnimation from '../animations/SignedUpAnimation'
import NotSignedUpAnimation from '../animations/NotSignedUpAnimation'

export default class EventView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            events: getEvents()
        }
    }

    isPlayerInList = (players) => {
        return players.indexOf(this.props.name) > -1
    }

    getSignedUpIcon = (players) => {
        if(this.isPlayerInList(players)){
            return (
                <SignedUpAnimation />
            )
        }
        return (
            <NotSignedUpAnimation />
        )
    }

    timeFormatter(date) {
        if(typeof(date) === 'number') {
            date = new Date(date)
        }
        let timeString = ''
        let day = date.getDay()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let now = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate()+ 1)
        const timeDiff = date - now

        let twentyFourHours = 60 * 60 * 24

        switch (true) {
            // Om eventet är idag:
            case now.getDate() === date.getDate():
            timeString = 'Today ' + date.toTimeString().substring(0, 5)
            break;
             // Om eventet är imorgon:
             case tomorrow.getDate() === date.getDate():
             timeString = 'Tomorrow ' + date.toTimeString().substring(0, 5)
             break;
            default:
            timeString = date.toString().substring(0, 21)
          }
        return timeString
    }

    render() {
        console.log('rendering events: ', this.state.events)
        return (
            <BackgroundImage>
                <View style={styles.eventListContainer}>
                {this.state.events.map((event) => {
                    //Varje unikt event
                    return (
                    <View style={styles.eventContainer}
                    key={event.id}>
                        {this.getSignedUpIcon(event.currentPlayers)}
                        <Text style={styles.blackText}>
                        {this.timeFormatter(event.startTime)}
                        </Text>
                        <Text style={styles.whiteText}>
                        {event.currentPlayers.length + '/' + event.requiredPlayers}
                        </Text>
                    </View>
                    )
                })}
                </View>
            </BackgroundImage>
        )    }
}

// <CustomDatePicker />
//För nya events


const styles = StyleSheet.create({
    eventListContainer: {
        marginTop: 120, 
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    eventContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: '5%',
        backgroundColor: 'rgba(92, 200, 255, 0.75)',
        padding: 10,
    },
    blackText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    whiteText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    }
})
