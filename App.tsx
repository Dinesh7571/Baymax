import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {RFValue} from 'react-native-responsive-fontsize'
import Navigation from './src/navigation/Navigation'
import { batteryOptimizationcheck, powerManagerCheck, requestPermission } from './src/notification/notificationPermission'
import './src/notification/notificationListeners'
import { registeringAllTriggers } from './src/notification/registerTriggers'
import { setCategories } from './src/notification/notificationInitial'

const App = () => {
   
  const permissionChecks=async()=>{
    requestPermission()
    registeringAllTriggers()
    setCategories()
    if(Platform.OS=='android'){
      batteryOptimizationcheck()
      powerManagerCheck()
    }

  }

  useEffect(()=>{
    permissionChecks()
   
  },[])


  return (
   
  <>
   <Navigation/>
   <StatusBar  translucent={true} backgroundColor={'transparent'} />
  </>

  
     
    
  )
}

export default App

const styles = StyleSheet.create({})