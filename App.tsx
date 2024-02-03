import * as React from 'react';
import HomePage from './src/home';
import AddItem from './src/add';
import Itemslist from './src/list';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()
export default function App() { 
  return ( 
    <NavigationContainer > 
      <Stack.Navigator screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="HomePage" component = {HomePage} /> 
        <Stack.Screen name="AddItem" component = {AddItem} /> 
        <Stack.Screen name="Itemslist" component = {Itemslist} /> 
      </Stack.Navigator> 
    </NavigationContainer> 
  );
}