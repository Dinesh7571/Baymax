import { ImageBackground, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../utils/Constants'
import Background from '../components/baymax/Background'
import Loading from '../components/baymax/Loading'
import BigHero6 from '../components/baymax/BigHero6'
import { playTTs } from '../utils/ttsListeners'
import SoundPlayer from 'react-native-sound-player'
import { playSound } from '../utils/voiceUtils'
import { prompt } from '../utils/data'
import Instructions from '../components/baymax/Instructions'
import Pedometer from '../components/pedometer/Pedometer'
import { askAI } from '../service/GeminiService'



const BaymaxScreen = () => {

  const [showInstruction, setShowInstruction] = useState(false)
  const [showloader, setShowloader] = useState(true)
  const [message, setMessage] = useState('')
  const [showPedometer, setPedometer] = useState(false)

  const blurOpacity = useRef(new Animated.Value(0)).current
  const startBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start()
  }

  const unBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true
    }).start()
  }

  const handleError = (error: string) => {
    playTTs('There was some error ! please try again ')
    startBlur()
    setMessage('')
    setShowloader(true)
    SoundPlayer.stop();
    setShowInstruction(false)
    console.log(error)
  }

  const handleResponse = async (
    type: string,
    promptText: string,
    sound: string
  ) => {
    try {
      if (type === 'meditation') {
        playTTs("focus on your breath !")
        playSound(sound)
        setMessage('meditation')
        return
      }

      const data= await askAI(promptText)
      setMessage(data)
      playTTs(data)
       if(type=='happiness'){
        setTimeout(()=>{
          playSound(sound)
        },5000)
      }else{
        playSound(sound)
      }
      
      unBlur()
    } catch (error: any) {
      handleError(error)
    } finally {
      setShowloader(false)
    }
  }

  const onOptionPressHandler = (type: string) => {
    setShowInstruction(true)
    if (type === 'pedometer') {
      setPedometer(true)
      setShowloader(false)
      return

    }

    switch (type) {
      case 'happiness':
        handleResponse(type, prompt.joke, 'laugh')
        break;
      case 'motivation':
        handleResponse(type, prompt.motivation, 'motivation')
        break;
      case 'health':
        handleResponse(type, prompt.health, 'meditation')
        break;
      case 'meditation':
        handleResponse(type, prompt.health, 'meditation')
        break;
      default:
          handleError('There was no type like that')
    }

  }

  useEffect(() => {
    const timer = setTimeout(startBlur, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>

      {message && (
        <Instructions
          onCross={() => {
            startBlur()
            setMessage('')
            setShowloader(true)

            SoundPlayer.stop()
            setShowInstruction(false)
          }}
          message={message}
        />
      )}

      {showPedometer && (
        <Pedometer
          onCross={() => {
            startBlur()
            setMessage('')
            setShowloader(true)
            setPedometer(false)
            SoundPlayer.stop()
            setShowInstruction(false)
          }}
          message={message}
        />
      )}



      {showloader &&
        <View style={styles.loaderContainer}>
          <Loading />
        </View>

      }

      {!showInstruction &&
        <BigHero6 onPress={onOptionPressHandler} />

      }
      <Background blurOpacity={blurOpacity} />
    </View>
  )
}

export default BaymaxScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondry,
    justifyContent: 'center',
    alignItems: 'center',

  },
  loaderContainer: {
    position: 'absolute'
  }
})