import React from 'react'
import { Animated, Text, Platform, View, Dimensions, Image } from 'react-native'

const { width: screenW, height: screenH } = Dimensions.get('window');
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
const saveHeight = 24
const contentHeight = 50

const isX = Platform.OS === 'ios' &&
  ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
    (screenH === X_WIDTH && screenW === X_HEIGHT))

const height = contentHeight + (isX ? saveHeight : 0)

export default class AnimateBottom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bottom: new Animated.Value(-height)
    }
    this.isTrashOpen = false
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
    this.isTrashOpen = false
    Animated.timing(
      this.state.bottom,
      {
        toValue: -height,
        duration: 200,
        useNativeDriver: false
      }
    ).start()
  }

  openTrash = () => {
    this.isTrashOpen = true
    this.forceUpdate()
  }
  closeTrash = () => {
    this.isTrashOpen = false
    this.forceUpdate()
  }

  getHeight = () => {
    return height
  }

  render() {
    return (
      <Animated.View
        {...this.props}
        style={{
          position: 'absolute',
          right: 0,
          bottom: this.state.bottom,
          opacity: 0.8,
          left: 0,
          backgroundColor: 'red'
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: contentHeight,
          }}>
          <Image style={{ height: 20, width: 20 }} source={this.isTrashOpen ? require('../assets/bottom_trash_open.png') : require('../assets/bottom_trash_close.png')} />
          <Text style={{ marginTop: 5, color: 'white', fontSize: 12 }}>拖动到此处删除</Text>
        </View>
        {isX && <View style={{ width: '100%', height: saveHeight }} />}
      </Animated.View>
    )
  }
}