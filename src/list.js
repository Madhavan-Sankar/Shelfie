import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity, ToastAndroid, Dimensions  } from 'react-native';
import { ref , set, push, onValue, update} from "firebase/database";
import {db} from '../firebase_config'
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
    if (InputNumber == null ) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Enter Quantity!!',
        visibilityTime: 1500,
        autoHide: true
      });
      setInputNumber(null);
    }
    else if(/\D/.test(InputNumber))
    {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Enter only numbers for Quantity!!',
        visibilityTime: 1500,
        autoHide: true
      });
      setInputNumber(null);
    }
    else if (parseInt(selectedItem.Quantity) - parseInt(InputNumber) < 0 && str=='Out'){
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Sorry, Only '+selectedItem.Quantity+' is available!!',
        visibilityTime: 1500,
        autoHide: true
      });
      setInputNumber(null);
    }
    else {
        //push in or out transaction details into Transactions schema with date and time info
        const newTransasctionKey = push(ref(db,'Transactions/')).key;
        set(ref(db,`Transactions/${newTransasctionKey}`),{
            InorOut: str,
            ItemName: selectedItem.ItemName,
            Quantity: InputNumber,
            Time: formattedDateTime
        });
        if (str == 'In')
        {
          selectedItem.Quantity = parseInt(selectedItem.Quantity) + parseInt(InputNumber);
        }
        else if (str == 'Out')
        {
          selectedItem.Quantity = parseInt(selectedItem.Quantity) - parseInt(InputNumber);
        }
        const recordRef = ref(db, '/Items/' + selectedItem.id);
        update(recordRef, selectedItem)
          .then(() => {
            console.log('Record updated successfully!');
          })
          .catch((error) => {
            console.error('Error updating record:', error);
          });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success!',
          visibilityTime: 1500,
          autoHide: true
        });
        setInputNumber(null);
    } 
    
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
          borderRadius:10,  
          borderWidth: 1,  
          borderColor: '#fff',
        }}
      >
        <View style={{
                      width: '90%',
                      marginTop: (Dimensions.get('window').height)/2.5,  
                      marginLeft: Dimensions.get('window').width/20,
                      backgroundColor: '#84cacf',   
                      borderColor: '#000000',
                      borderWidth: 1.5,
                      alignItems: 'flex-end',
        }}>
          <TouchableOpacity style={{width: 25, height: 25, paddingTop: 1,}} onPress={() => handleModalClose()}>
                      <Text style={{fontSize: 20, fontFamily: 'bold', color: '#e6050c',}}>X</Text>
            </TouchableOpacity>
            <View style={{ 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                width: '100%'
              }}>
                <Text style = {styles.heading}>
                  {selectedItem !== null ? selectedItem.ItemName : 'null'}
                </Text>
                <TextInput
                    style={{
                      color: '#8c0a79',
                      fontSize: 20,
                      width: 250,
                      justifyContent: 'center',
                      textAlign: 'center',
                      marginTop: 5,
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
                    <TouchableOpacity style={[styles.buttondelete, {marginStart: 150}]} onPress={() => handleModalItemPress('Out')}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                </View>
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
