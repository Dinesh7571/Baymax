import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { circleRadius } from '../../utils/Constants'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useWaterStore } from '../../state/waterStore'
import { playTTs } from '../../utils/ttsListeners'
import { playSound } from '../../utils/voiceUtils'

const Water = () => {

  const {waterDrinkStamps,addWaterIntake} =useWaterStore()
  const totalSegments =8;
  const completedSegments= waterDrinkStamps.length

  const containerStyle=[styles.container,
    completedSegments===totalSegments && styles.containerCompleted
  ]

  const handlePress=()=>{
    
   if(completedSegments<totalSegments){
    const timestamp= new Date().toISOString()
    addWaterIntake(timestamp)
    playSound('ting')

    setTimeout(()=>{
      playTTs('Good work  stay hydrated')
    },1000)

   }else{
   
    playTTs("You Have Completed Daily Water Intake")
   Alert.alert("You Have Completed Daily Water Intake")
   }
  }
  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      <Icon name='water' color='#1ca3ec' size={RFValue(32)}/>  
      <View style={styles.segmentContainer}>
       {Array.from({length:totalSegments}).map((_,index)=>(
          <View 
          key={index}
          style={[
            styles.segment,
            {
               backgroundColor:completedSegments===totalSegments?
               '#00D100' :
               index < completedSegments ?"#1ca3ec" :
               '#eee',
               transform:[{rotate:`${(index*360)/totalSegments}deg`},
                  {translateX:circleRadius/2-5}
               ]
            }
        ]}
          />
          
         
       ))}
      </View> 
    </TouchableOpacity>
  )
}

export default Water

const styles = StyleSheet.create({
    container :{
      height:circleRadius,
      width:circleRadius,
      borderRadius:circleRadius,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      padding:10,
      shadowOffset:{width:1,height:1},
      elevation:10,
      shadowRadius:16,
      shadowColor:'#000',
      shadowOpacity:0.3

    },
    containerCompleted:{
        shadowColor:'yellow',
        elevation:10
    },
    segmentContainer:{
      position:'absolute',
      height:circleRadius,
      width:circleRadius,
      borderRadius:circleRadius/2,
      justifyContent:'center',
      alignItems:'center'

    },
    segment:{
        position:'absolute',
        width:8,
        height:4,
        borderRadius:2,
    }
})