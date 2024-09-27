module.exports={
    project:{
        ios:{},
        android:{}
    },
    'react-native-vector-icons':{
        platform:{
            ios:null
        }
    },
    assets:['./src/assets/fonts'],
    getTransformModulePath(){
        return require.resolve('react-native-typescript-transformer')
    },
    getSourceExts(){
        return ['ts','tsx'];
    }
}