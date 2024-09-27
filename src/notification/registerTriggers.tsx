import { usePedometerStore } from "../state/pedometerStore"
import { useWaterStore } from "../state/waterStore"
import { createTimeStampsNotification } from "./notificationUtils"
import notifee from '@notifee/react-native'

const INTERVAL_NOTIFICATION_ID='water-reminder'

const createHourlyRemainder=async()=>{
   const startHour=9;
   const endHour=23;
   const interval=2;
   let counter=1;
   for(let hour=startHour;hour<=endHour;hour+=interval){
    await createTimeStampsNotification(
        require('../assets/images/water.png'),
        'Water remainder 💧',
        "Time to drink water ! keep yourself hydrated",
        hour,
        0,
        `${INTERVAL_NOTIFICATION_ID}-${counter }`
      
    )
    counter++
   }
}





export const registeringAllTriggers = async () => {

    const { waterDrinkStamps, resetWaterIntake } = useWaterStore.getState()

    const { initializeStepsForTheDay } = usePedometerStore.getState()
    initializeStepsForTheDay()

    // GOOD Morning
    createTimeStampsNotification(
        require('../assets/images/gm.png'),
        "good morning",
        "Stay your day with positivity",
        6,
        0,
        "good-morning"
    )

    // GOOD NIGHT
    createTimeStampsNotification(
        require('../assets/images/gn.png'),
        "good night 🌙",
        "End your day with peace and relax",
        22,
        0,
        "good-night"
    )

    //morning walking remainder
    createTimeStampsNotification(
        require('../assets/images/run.png'),
        "Healthy Walking",
        "Take a step today towards healthier you",
        7,
        0,
        "daily-walking-morning"
    )


     // evening walking remainder
     createTimeStampsNotification(
        require('../assets/images/run.png'),
        "Healthy Walking 🌙",
        "Take a step today towards healthier you",
        18,
        0,
        "daily-walking-evening"
    )

    //water remainder
    if(waterDrinkStamps.length!=8){
        await createHourlyRemainder()

    }else{
        const notifications =await notifee.getTriggerNotifications()
        let counter =1
        for(const notification of notifications){
            if(notification.notification.id===`${INTERVAL_NOTIFICATION_ID}-${counter}`){
                await notifee.cancelNotification(notification.notification.id)
            }
            counter++
        }
    }
  // Reset water intake every day when app opens
  const now =new Date()
  const currentDate= now.toISOString().split('T')[0]
  const isFromOreviousDay=(timeStamp:string[])=>{
    if(timeStamp.length===0)return true
    const lastTimeStamps =new Date(timeStamp[timeStamp.length-1])
    const lastDate=lastTimeStamps.toISOString().split('T')[0]
    return lastDate !==currentDate
  }

  if(isFromOreviousDay(waterDrinkStamps)){
    resetWaterIntake()
  }

}