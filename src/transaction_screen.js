import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ToastAndroid, Dimensions  } from 'react-native';
import { ref, onValue } from 'firebase/database'; // Make sure to import the appropriate functions from Firebase
import {db} from '../firebase_config'
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './style';



const Transaction = () => {
  const [FetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState(FetchedData);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const dbRef = ref(db, '/Transactions');
    onValue(dbRef, (snapshot) =>  {
        const data = snapshot.val();
        const newPosts = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        }))
        setFetchedData(newPosts);
        setFilteredData(newPosts);
    })
  }, []);

  
  return (
    <GestureHandlerRootView style={{ flex: 1 , alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.pageview}>
        <Text style={styles.heading}>ITEMS LIST</Text>
        <View style = {styles.inputstyle}>
        <TextInput
          placeholder="Item Name"
          style={styles.input}
          placeholderTextColor="#C70039"
          onChangeText={(text) => {
            setSearchText(text);
            setFilteredData(FetchedData.filter((item) =>
              item.ItemName.toLowerCase().includes(text.toLowerCase())
            ));
          }}
        />
        </View>
        <FlatList
          data={filteredData}
          style={styles.list}
          contentContainerStyle={{ padding: 5, alignItems: 'center' }}
          renderItem={({ item }) => (
            <View
              style={styles.listouterview}
            >
                <View
                  style={styles.listinnerleftview}
                >
                  <Text style={styles.listItemText}>ItemName:</Text>
                  <Text style={styles.listItemText}>Quantity:</Text>
                  <Text style={styles.listItemText}>Action:</Text>
                  <Text style={styles.listItemText}>Time:</Text>
                </View>
                <View
                  style={styles.listinnerrightview}
                >
                  <Text style={styles.listItemText}>{item.ItemName}</Text>
                  <Text style={styles.listItemText}>{item.Quantity}</Text>
                  <Text style={styles.listItemText}>{item.InorOut}</Text>
                  <Text style={styles.listItemText}>{item.Time}</Text>
                </View>
                
            </View>
          )}
        />

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </GestureHandlerRootView>
    
  );
};


export default Transaction;
