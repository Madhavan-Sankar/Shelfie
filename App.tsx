//to build an apk
//goto shelfie/android
//gradlew clean
//gradlew assembleRelease
//you will have your file in D:\ReactNativeProjects\Shelfie\android\app\build\outputs\apk\release\app-release.apk


import * as React from 'react';
import HomePage from './src/home';
import AddItem from './src/add';
import Itemslist from './src/list';
import Transaction from './src/transaction_screen';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import './firebase_config/auth'
const Stack = createNativeStackNavigator()


export default function App() { 
  return ( 
    <NavigationContainer > 
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="HomePage" component = {HomePage} /> 
        <Stack.Screen name="AddItem" component = {AddItem} /> 
        <Stack.Screen name="Itemslist" component = {Itemslist} /> 
        <Stack.Screen name="Transaction" component = {Transaction} /> 
      </Stack.Navigator> 
    </NavigationContainer> 
  );
}