import Tts from "react-native-tts"

export const initializwTtsListeners = async () => {
  Tts.getInitStatus().then(() => {
    console.log("ALL OK TTS ✅")
  },
    (err) => {
      if (err.code == "no_engine") {
        console.log("NO ENGINE😒, INSTALLING... ⛷️")
        Tts.requestInstallEngine()
      }
    })

  //  const voices= await Tts.voices()
  //  console.log(voices)
  //  Tts.setDefaultVoice("put the voice character here")
  Tts.setDefaultRate(1, true)
  Tts.setIgnoreSilentSwitch('ignore')

  Tts.addEventListener('tts-start', (event) => {
    console.log('TTs Started:', event)
  })

  Tts.addEventListener('tts-progress', (event) => {
    // console.log('TTs progress:',event)
  })

  Tts.addEventListener('tts-finish', (event) => {
    console.log('TTs finish:', event)
  })

  Tts.addEventListener('tts-cancel', (event) => {
    console.log('TTs cancel:', event)
  })

}


export const playTTs = async (message: string) => {

  Tts.getInitStatus().then(() => {
    console.log("ALL OK TTS ✅")
  },
    (err) => {
      if (err.code == "no_engine") {
        console.log("NO ENGINE😒, INSTALLING... ⛷️")
        Tts.requestInstallEngine()
      }
    }
  )
  
  Tts.speak(message)
    
}
