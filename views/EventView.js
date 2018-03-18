import React from 'react'
import { View, Text } from 'react-native'
import CustomDatePicker from '../common/CustomDatePicker'
import BackgroundImage from '../common/BackgroundImage'
import { getEvents } from '../services/dataHandler'

export default class EventView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            events: getEvents()
        }
    }

    autoCapitalize(text) {
        return text.slice(0,1).toUpperCase() + text.slice(1, text.length)
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
            timeString = 'Idag ' + date.toLocaleTimeString('sv-SE')
            break;
             // Om eventet är imorgon:
             case tomorrow.getDate() === date.getDate():
             timeString = 'Imorgon ' + date.toLocaleTimeString('sv-SE')
             break;
            // Om det är mer än 24 h kvar:
            case timeDiff > twentyFourHours:
              timeString = date.toLocaleDateString('sv-SE', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}) + ' ' + date.toLocaleTimeString('sv-SE') + ''
              break;
            default:
              timeString = date.toLocaleDateString('sv-SE', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}) + ' ' + date.toLocaleTimeString('sv-SE') + ''
          }
        return this.autoCapitalize(timeString)
    }

    render() {
        console.log('rendering events: ', this.state.events)
        return (
            <BackgroundImage>
                <View style={{ marginTop: 120 }}>
                    {this.state.events.map((event) => {
                        return <Text key={event.id}>
                            {this.timeFormatter(event.startTime)}
                        </Text>
                    })}
                    <CustomDatePicker />
                </View>
            </BackgroundImage>
        )
    }
}