import React from 'react'
import LottieView from 'lottie-react-native'
import StyleSheet from 'react-native'

export default class PlusAnimation extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    //this.animation.play(30, 120);
  }

  render() {
    return (
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        loop={true}
        style={{ width: 30, height: 30 }}
        source={require('./fancyPlus.json')}
      />
    );
  }
}