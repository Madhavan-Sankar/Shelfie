import styles from './style';
import React from 'react';
import { View, Button , Text, TouchableOpacity} from "react-native";

export default function HomePage({navigation}) {

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

