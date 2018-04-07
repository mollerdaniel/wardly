import React from 'react'
import LottieView from 'lottie-react-native'

export default class NotSignedUpAnimation extends React.Component {
  componentDidMount() {
    this.animation.play(0, 0)
  }

  render() {
    return (
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        loop={false}
        style={{ width: 30, height: 30 }}
        source={require('./signUp.json')}
      />
    );
  }
}