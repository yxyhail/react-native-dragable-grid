import React from 'react'
import { Animated, Text } from 'react-native'

const height = 60

export default class AnimateBottom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bottom: new Animated.Value(-this.props.height)
    }
    // Animated.timing(
    //   this.state.bottom,
    //   {
    //     toValue: 0, duration: 200,
    //     useNativeDriver: false
    //   }
    // ).start()
  }

  show = () => {
    Animated.timing(
      this.state.bottom,
      {
        toValue: 0, duration: 200,
        useNativeDriver: false
      }
    ).start()
  }

  hide = () => {
    Animated.timing(
      this.state.bottom,
      {
        toValue: -height, duration: 200,
        useNativeDriver: false
      }
    ).start()
  }


  render() {
    return (
      <Animated.View style={{
        position: 'absolute',
        right: 0,
        bottom: this.state.bottom,
        left: 0,
        height: height,
        backgroundColor: 'blue'
      }}>
      </Animated.View>
    )
  }
}