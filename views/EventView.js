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

    timeFormatter(date) {
        return date + ''
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