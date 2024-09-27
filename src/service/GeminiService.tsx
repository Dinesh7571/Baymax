import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { BASE_URL, GEMINI_API_KEY } from "./API";
import typescript from "react-native-svg";
import axios from "axios";

const genAI=new  GoogleGenerativeAI(GEMINI_API_KEY)
export const askAI = async(prompt:string)=>{
    try {
         const model=genAI.getGenerativeModel({model:'gemini-pro'})
         const result =await model.generateContent(prompt)
         const response= result.response.text()
         return response
    } catch (error) {
         throw error
    }
}


export const registerToken=async(device_token:string)=>{
     try {
          console.log(device_token)
            const res =await axios.post(`${BASE_URL}/notification/register-token`,{
               device_token
            })
            console.log("registered"+(res.data))
     } catch (error) {
          console.log(error)
     }
}