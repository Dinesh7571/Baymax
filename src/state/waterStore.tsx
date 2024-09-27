import { create } from "zustand";
import { mmkvStorage } from "./storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { displayNotification } from "../notification/notificationInitial";

interface waterStore{
    waterDrinkStamps:string[],
    addWaterIntake:(timestamp:string)=>void;
    resetWaterIntake:()=>void;

}

export const useWaterStore =create<waterStore>()(
    persist(
         (set,get)=>({
            waterDrinkStamps:[],
            addWaterIntake:(timestamp)=>{
                const waterDrinkStamps=[...get().waterDrinkStamps,timestamp]
                set({waterDrinkStamps})
                displayNotification(`
                    water Intake ${waterDrinkStamps.length}/8`,
                    'stay Hydrated',
                    require('../assets/images/water.png'),
                    'water-intake'
                )
            },
            resetWaterIntake:()=>{
                set({waterDrinkStamps:[]})

            },
         }),
        {
            name:'water-storage',
            storage:createJSONStorage(()=>mmkvStorage)
        }
    )
)