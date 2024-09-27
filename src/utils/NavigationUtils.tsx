import {
        CommonActions,
        createNavigationContainerRef
} from '@react-navigation/native';

export const navigationRef=createNavigationContainerRef()

export async function navigate(routename:string,params?:object){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(routename,params))
    }
}

export async function resetAndNavigate(routename:string){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.reset({
            index:0,
            routes:[{name:routename}]
        }))
    }
}