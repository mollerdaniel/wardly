import React from 'react'
import DatePicker from 'react-native-datepicker'

export default class CustomDatePicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: null
        }
    }

    render() {
        return (
            <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 254,
                        marginLeft: 0
                    },
                    dateInput: {
                        top: 250,
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
            />
        )
    }
}