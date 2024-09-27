import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import BaymaxScreen from '../screens/BaymaxScreen'
import { navigate, navigationRef } from '../utils/NavigationUtils'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Stack=createNativeStackNavigator()

const Navigation:FC = () => {
  return (
    <GestureHandlerRootView>
    <NavigationContainer ref={navigationRef}>
     
      <Stack.Navigator
       initialRouteName='SplashScreen'
       screenOptions={{headerShown:false
       }}>

        <Stack.Screen name='SplashScreen'
         component={SplashScreen}
         />

        <Stack.Screen name='BaymaxScreen' 
        options={{animation:'fade'}}
        component={BaymaxScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default Navigation

const styles = StyleSheet.create({})