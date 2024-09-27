import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
    <View>
       <LottieView source={require('../../assets/animations/sync.json')}
            style={{width:280,height:100}} 
            autoPlay={true}
            loop
            />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})