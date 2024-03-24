import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, Button, StyleSheet, Modal, TouchableOpacity, ToastAndroid, Dimensions  } from 'react-native';
import { ref, onValue } from 'firebase/database'; // Make sure to import the appropriate functions from Firebase
import {db} from '../config'
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './style';


const Transaction = () => {
  const [FetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState(FetchedData);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item

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

    
  const handleItemPress = (item) => {
    setSelectedItem(item); // Store the clicked item
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
    //setSelectedItem(null); // Clear selected item
  };

  const handleButton1 = () => {
    // Implement your logic for button 1 action, using selectedItem if needed
    console.log('Button 1 pressed', selectedItem);
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Button 1 pressed '+selectedItem,
      visibilityTime: 1500,
      autoHide: true
    });
    handleModalClose(); // Close the modal after button action
  };

  const handleButton2 = () => {
    // Implement your logic for button 2 action, using selectedItem if needed
    console.log('Button 2 pressed:', selectedItem);
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Button 2 pressed '+selectedItem,
      visibilityTime: 1500,
      autoHide: true
    });
    handleModalClose(); // Close the modal after button action
  };
  /*
  const handleItemPress = (item) => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: item.ItemName,
      visibilityTime: 1500,
      autoHide: true
    });
  };*/

  return (
    <GestureHandlerRootView style={{ flex: 1 , alignItems: 'center', justifyContent: 'center'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
        style={{flex:1, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.buttonadd} onPress={handleButton1}>
              <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttondelete, { marginStart: 100 }]} onPress={handleButton2}>
              <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
          style = {styles.list}
          contentContainerStyle={{ padding: 10 ,alignItems: 'center'}}
          renderItem={({ item }  ) => (
            <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress(item)}>
              <Text style={styles.listItemText}>{item.ItemName}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </GestureHandlerRootView>
    
  );
};


export default Transaction;
