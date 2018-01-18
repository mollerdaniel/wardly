import React from 'react';
import LottieView from 'lottie-react-native';

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
        style={{width: 24, height: 24, marginTop: 5}}
        loop={true}
        source={require('./plusAnimationData.json')}
      />
    );
  }
}