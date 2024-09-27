import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import LottieView from 'lottie-react-native'
import Markdown from 'react-native-markdown-display'
import { Fonts } from '../../utils/Constants'



const Instructions:FC<{
  message:string;
  onCross:()=>void;
}> = ({message,onCross}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cross} onPress={onCross}>
        <Icon name='close-circle' color="red" size={RFValue(20)}/>
      </TouchableOpacity>
     <Image 
     style={styles.logo}
     source={require('../../assets/images/logo_short.png')}
     />
    <View>
    {message==='meditation'?
      <LottieView 
       source={require('../../assets/animations/breath.json')}
       style={{width:400,height:400,alignSelf:'center'}}
       autoPlay
       loop
      />  
      : <Markdown style={{
        body:{
          fontFamily:Fonts.Theme,
          fontSize:RFValue(20),
          padding:20

        }
      }}>
        {message}

      </Markdown>
    }
    </View>

    </View>
  )
}

export default Instructions

const styles = StyleSheet.create({
  container:{
    paddingVertical:10,
    width:'90%',
    justifyContent:'center',
    backgroundColor:'white',
    shadowOffset:{width:1,height:1},
    shadowOpacity:0.08,
    shadowRadius:16,
    elevation:10,
    shadowColor:'#000',
    borderRadius:10
  },
  logo:{
    width:50,
    height:40,
    alignSelf:'center',
    marginVertical:10,


  },
  cross:{
    position:'absolute',
    right:10,
    top:10
  }
})