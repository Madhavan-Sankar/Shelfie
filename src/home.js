import styles from './style';
import { View, Text, TouchableOpacity} from "react-native";
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function HomePage({navigation}) {
  const currentScreenName = useRoute().name;
  // const [isFocused, setIsFocused] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => setIsFocused(true));

  //   return unsubscribe;
  // }, [navigation]);

  
  // const handleBackPress = () => {
  //   if (currentScreenName == 'HomePage') {
  //     return true;//changes false to true
  //   }
  //   return false;
  // };

  // useEffect(() => {
  //   const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  //   return () => backHandlerSubscription.remove();
  // }, [handleBackPress, false]);

  return (
    <View  style={styles.pageview}>
      <Text style = {styles.heading}>WELCOME TO SHELFIE</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Itemslist')}>
          <Text style={styles.buttonText}>View Items</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Transaction')}>
          <Text style={styles.buttonText}>View Transactions</Text>
      </TouchableOpacity>
    </View>
  );
}

