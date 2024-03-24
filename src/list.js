import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity, ToastAndroid, Dimensions  } from 'react-native';
import { ref , set, push, onValue} from "firebase/database";
import {db} from '../config'
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './style';

const Itemslist = () => {
  const [FetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState(FetchedData);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item
  const [InputNumber, setInputNumber] = useState('');

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0'); 
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const hour = today.getHours();
  const hh = hour % 12 || 12;
  const mins = today.getMinutes();
  const amPm = hour < 12 ? 'AM' : 'PM';
  const formattedDateTime = `${dd}/${mm}/${yyyy} ${hh}:${mins.toString().padStart(2, '0')} ${amPm}`;

  
  useEffect(() => {
    const dbRef = ref(db, '/Items');
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
    setInputNumber(null)
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
    setSelectedItem(null); // Clear selected item
  };

  const handleModalItemPress = (str) => {
    const newTransasctionKey = push(ref(db,'Transactions/')).key;
    set(ref(db,`Transactions/${newTransasctionKey}`),{
        InorOut: str,
        ItemName: selectedItem.ItemName,
        Quantity: InputNumber,
        Time: formattedDateTime
    });
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Success',
      visibilityTime: 1500,
      autoHide: true
    });
    setInputNumber(null);
  };

  const handleChangeNumber = (text) => {
    setInputNumber(text);
  };
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
        style={{
          justifyContent: 'center',  
          alignItems: 'center',   
          backgroundColor : "#ffffff",   
          height: 100 ,  
          width: '80%',  
          borderRadius:10,  
          borderWidth: 1,  
          borderColor: '#fff',    
        }}
      >
        <View style={{ 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center', 
            marginTop: (Dimensions.get('window').height)/2.5,  
            marginLeft: Dimensions.get('window').width/13,
            backgroundColor: '#84cacf',
            width: 350,
            height: 200   
          }}>
            <Text style = {styles.heading}>
                Display the item name here
            </Text>
            <TextInput
                style={{
                  color: '#8c0a79',
                  fontSize: 15,
                  width: 250,
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: 20,
                  marginBottom: 20
                }}
                keyboardType="numeric" 
                placeholder="Enter number"
                placeholderTextColor="#8c0a79"
                value={InputNumber}
                onChangeText={handleChangeNumber}
            />
            <View style={{flexDirection: 'row', }}>
                <TouchableOpacity style={styles.buttonadd} onPress={() => handleModalItemPress('In')}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttondelete, {marginStart: 100}]} onPress={() => handleModalItemPress('Out')}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
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
          contentContainerStyle={{ padding: 5 ,alignItems: 'center'}}
          renderItem={({ item }  ) => (
            <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress(item)}>
              <Text style={styles.listItemText}>{item.ItemName}      {item.Quantity}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </GestureHandlerRootView>
  );
};

export default Itemslist;
