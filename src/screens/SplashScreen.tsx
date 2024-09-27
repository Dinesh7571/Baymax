import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { navigate, resetAndNavigate } from '../utils/NavigationUtils'
import { Colors, Fonts, lightColors } from '../utils/Constants'
import { screenHeight, screenWidth } from '../utils/Scaling'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import CustomText from '../components/global/CustomText'
import LottieView from 'lottie-react-native'
import Tts from 'react-native-tts'
import { initializwTtsListeners, playTTs } from '../utils/ttsListeners'
import { playSound } from '../utils/voiceUtils'

const bottomColors=[...lightColors].reverse()

const SplashScreen:FC = () => {

  const baymaxAnimation=useSharedValue(screenHeight*0.8)
  const messageContainerAnimation=useSharedValue(screenHeight*0.8)

  const launchAnimation=async()=>{
    messageContainerAnimation.value=screenHeight*0.001
    playSound('ting2')
    setTimeout(()=>{
      baymaxAnimation.value=screenHeight*0.02
      playTTs(" Hello i am Baymax ")
    },2000)

    setTimeout(()=>{
      resetAndNavigate('BaymaxScreen')
    },5000)
  }

  useEffect(()=>{
    initializwTtsListeners()
    launchAnimation()
  },[])

  const animateImageStyle=useAnimatedStyle(()=>{
    return {
      transform:[{
        translateY:
        withTiming(
          baymaxAnimation.value,
        {duration:1500}
      )}]
    }
  })

  const messageContainerStyle=useAnimatedStyle(()=>{
    return {
      transform:[{
        translateY:
        withTiming(
          messageContainerAnimation.value,
        {duration:1200}
      )}]
    }
  })

  return (
    <View style={styles.container}>
     <Animated.View style={[styles.imageContainer,animateImageStyle]}>
       <Image source={require('../assets/images/launch.png')} style={styles.img} />
     </Animated.View>
     <Animated.View style={[styles.gradientContainer,messageContainerStyle]}>
        <LinearGradient colors={bottomColors} style={styles.gradient}>
          <View  style={styles.textContainer}>
            <CustomText fontSize={34} fontFamily={Fonts.Theme} >
              BAYMAX!
            </CustomText>
            <LottieView source={require('../assets/animations/sync.json')}
            style={{width:280,height:100}} 
            autoPlay={true}
            loop
            />
            <CustomText >
              Synchronizing best configuration for you...
            </CustomText>
          </View>
        </LinearGradient>
     </Animated.View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    gradientContainer:{
      position:'absolute',
      height:'35%',
      bottom:0,
      width:'100%'
    },
    textContainer:{
      backgroundColor:'white',
      flex:1,
      borderRadius:20,
      padding:20,
      shadowOffset:{width:1,height:1},
      shadowOpacity:1,
      shadowRadius:2,
      alignItems:'center',
      shadowColor:Colors.secondry,
     
    },
    gradient:{
        width:'100%',
        height:'100%',
        paddingTop:30
    },
    container:{
        flex:1,
        backgroundColor:Colors.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer:{
        width:screenWidth-20,
        height:screenHeight * 0.5
    },
    img:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    }
})