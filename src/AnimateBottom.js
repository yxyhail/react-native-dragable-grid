import React from 'react'
import { Animated, Text } from 'react-native'

const height = 60

export default class AnimateBottom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bottom: new Animated.Value(-height)
    }
    this.props.callback && this.props.callback(this)
  }

  dispatcher = (type = 'show') => {
    switch (type) {
      case 'show':
        this.show()
        break
      case 'hide':
        this.hide()
        break
      default:
        break
    }
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
      <Animated.View
        {...this.props}
        style={{
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