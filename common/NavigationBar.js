import React from 'react'
import { Platform, Alert, View } from 'react-native'
import NavigationBar from 'react-native-navbar';

const styles = {
  container: {
    flex: 1,
  },
};

/*
 https://github.com/react-native-community/react-native-navbar#examples
 Link to get all options for the buttons
*/
const defaultLeftButtonConfig = {
  title: '',
  disabled: true
};

const defaultRightButtonConfig = {
  title: '',
  disabled: true,
};

export default class NavBar extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          title: (props.title) ? props.title : '',
          leftButtonConfig: (props.leftButtonConfig) ? props.leftButtonConfig : defaultLeftButtonConfig,
          rightButtonConfig: (props.rightButtonConfig) ? props.rightButtonConfig : defaultRightButtonConfig
      }
  }

  render() {
    if (Platform.OS !== 'ios') { return( <View style={{flex: 1}}/> ) }
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{title: this.state.title}}
          leftButton={this.state.leftButtonConfig}
          rightButton={this.state.rightButtonConfig}
        />
      </View>
    );
  }
}