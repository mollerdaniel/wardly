import React from 'react'
import LottieView from 'lottie-react-native'

export default class SignUpAnimation extends React.Component {
  componentDidMount() {
    this.animation.play()
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