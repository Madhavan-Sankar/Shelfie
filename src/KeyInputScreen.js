import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { onValue, ref } from "firebase/database";
import { db } from '../firebase_config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';
import Toast from 'react-native-toast-message';


const KeyInputScreen = ({ navigation }) => {
  const [localKey, setlocalKey] = useState([]);
  const [KeyFromFirebase, setKeyFromFirebase] = useState([]);
  const [Changed, isChanged] = useState(false);
  


  useEffect(() => {
    console.log("\n\n\n\n");
    console.log("Running 1st use effect");
    const retrieveLocalKey = async () => {
      const retrievedValue = await AsyncStorage.getItem('localKey');
      if (retrievedValue !== null) {
        const data = retrievedValue;
        setlocalKey(data);
        //console.log("from 1st useeffect: local key:",localKey);
      } else {
        //console.log('No data found with the key \'localKey\'');
      }
    };
  
    const dbRef = ref(db, '/Authenticate');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const key = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setKeyFromFirebase(key);
    });
  
    retrieveLocalKey();
    return () => unsubscribe();
  },[]);

  
  useEffect(() => {
    console.log("\n\n\n\n\n\n\n");
    console.log("from 2nd useeffect: local key:",localKey);
    console.log("from 2nd useeffect: firebase key:",KeyFromFirebase, "    ", KeyFromFirebase.length);
    console.log("changed value: "+Changed);
    if(localKey && KeyFromFirebase.length)
    {
      console.log("Data is there !!");
      if(localKey == KeyFromFirebase[0].key)
      {
        if(Changed == true)
        {
          console.log("inside changed");
          AsyncStorage.setItem('localKey', localKey)
              .then(() => {
                console.log('Data stored successfully!');
              })
              .catch((error) => {
                console.error('Error storing data:', error);
              });
          Toast.show({
            type: 'success',
            position: 'top',
            text1: "Authenticated!!",
            visibilityTime: 1500,
            autoHide: true
          });
          setTimeout(() => {
            navigation.navigate('HomePage');        
            console.log('navigated!');
          }, 200);
        }
        else
        {
          navigation.navigate('HomePage');        
          console.log('navigated!');
        }
      }
    }
  })

  const handlelocalKey = (text) => {
    setlocalKey(text);
    isChanged(true);
  };

  const handleSaveKey = async () => {  
      if (!localKey || localKey == "") {
        alert('Please enter an API key.');
        return;
      }
      else if (localKey != KeyFromFirebase[0].key) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: "Invalid Key!!",
          visibilityTime: 1500,
          autoHide: true
        });
      }
      else{
        navigation.navigate('HomePage');        
        console.log('navigated!');
      }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={style.heading}>Enter your API Key:</Text>
          <TextInput
            value={localKey}
            onChangeText={handlelocalKey}
            placeholder="Your Local Key"
            placeholderTextColor= 'black'
            secureTextEntry // Make entry invisible for security
            style={{ borderWidth: 1, padding: 10, marginVertical: 10, color: 'black'}}
          />
      <Button title="AUTHENTICATE" onPress={handleSaveKey} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default KeyInputScreen;
