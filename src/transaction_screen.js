import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, Dimensions  } from 'react-native';
import { ref, onValue, remove} from 'firebase/database'; // Make sure to import the appropriate functions from Firebase
import {db} from '../firebase_config'
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './style';



const Transaction = () => {
  const [FetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState(FetchedData);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [InputNumber, setInputNumber] = useState('');

  const extractDate = (dateTimeString) => {
    const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
    const match = dateTimeString.match(dateRegex);
    if (match) {
      const day = match[1];
      const month = match[2];
      const year = match[3];
      return `${day}-${month}-${year}`;
    } else {
      console.warn("Invalid date format. Expected 'DD/MM/YYYY'.");
      return null;
    }
  }


  const handleItemPress = (item) => {
    setSelectedItem(item); // Store the clicked item
    setIsModalVisible(true); // Show the modal
    setInputNumber(null);
  };
  
  const handleModalClose = () => {
    setSelectedItem(null); // Clear selected item
    setIsModalVisible(false); // Hide the modal
  };

  const handleModalItemPress = (str, item) => {
    if (str == 'No'){
      handleModalClose();
    }
    else{
      try {
          onValue(ref(db, '/Items'), (snapshot) =>  {
            const data = snapshot.val();
            const newPosts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            for (iter of newPosts) {
              if (iter.ItemName == item.ItemName) {
                console.log(`ID of item ${item.ItemName}is:`, item.id);
                if(item.InorOut == 'In'){
                  iter.Quantity = parseInt(iter.Quantity) - parseInt(item.Quantity)
                }
                else{
                  iter.Quantity = parseInt(iter.Quantity) + parseInt(item.Quantity)
                }
                update(ref(db, '/Items/'+item.id), iter)
                .then(() => {
                  console.log('Record updated successfully!');
                })
                .catch((error) => {
                  console.error('Error updating record:', error); // Access error properties here
                });
                break;
              }
            }
        })
        const reference = ref(db, 'Transactions/'+ item.id)
        //remove(reference);
        handleModalClose();
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };
  
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
                {selectedItem !== null ? 'Sure to Delete Transaction?'  : 'null'}
              </Text>
              <Text style = {[styles.subheading, {marginBottom: 20}]}>
                {selectedItem !== null ? selectedItem.ItemName + '   '+ selectedItem.Quantity+ '   ' + extractDate(selectedItem.Time) : 'null'}
              </Text>
              <View style={{flexDirection: 'row', }}>
                  <TouchableOpacity style={styles.buttonadd} onPress={() => handleModalItemPress('Yes', selectedItem)}>
                      <Text style={styles.buttonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.buttondelete, {marginStart: 100}]} onPress={() => handleModalItemPress('No', selectedItem)}>
                      <Text style={styles.buttonText}>No</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
      <View style={[styles.pageview, { maxHeight: '99%' }]}>
        <Text style={styles.heading}>ITEMS LIST</Text>
        
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
        
        <FlatList
          data={filteredData}
          style={styles.list}
          contentContainerStyle={{ padding: 5, alignItems: 'center' }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.listouterview}>
                  <View style={styles.listinnerleftview}>
                    <Text style={styles.listItemText}>ItemName:</Text>
                    <Text style={styles.listItemText}>Quantity:</Text>
                    <Text style={styles.listItemText}>Action:</Text>
                    <Text style={styles.listItemText}>Time:</Text>
                  </View>
                  <View style={styles.listinnerrightview}>
                    <Text style={styles.listItemText}>{item.ItemName}</Text>
                    <Text style={styles.listItemText}>{item.Quantity}</Text>
                    <Text style={styles.listItemText}>{item.InorOut}</Text>
                    <Text style={styles.listItemText}>{item.Time}</Text>
                  </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </GestureHandlerRootView>
    
  );
};


export default Transaction;
