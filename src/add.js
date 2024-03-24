import styles from './style';
import { View, Text , TextInput, Touchable, Keyboard, Alert, TouchableOpacity} from "react-native";
import React , {useState,forwardRef} from "react";
import {db} from '../config'
import { ref , set, push} from "firebase/database";
import Toast from 'react-native-toast-message';

const AddItem = () => {
    const [ItemName, setItemName] = useState('');
    const [Qty, setQty] = useState('');
    
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); 
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const hour = today.getHours();
    const hh = hour % 12 || 12;
    const mins = today.getMinutes();
    const amPm = hour < 12 ? 'AM' : 'PM';
    const formattedDateTime = `${dd}/${mm}/${yyyy} ${hh}:${mins.toString().padStart(2, '0')} ${amPm}`;


    const addItemFirebase = () =>{
        if(ItemName.trim() === '' || Qty.trim() === '')
        {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Please fill all the mandatory fields',
                visibilityTime: 1500,
                autoHide: true
            });
        }
        else
        {
            const newItemKey = push(ref(db, 'Items/')).key;
            set(ref(db, `Items/${newItemKey}`), {
                ItemName: ItemName,
                Quantity: Qty
            });
            const newTransasctionKey = push(ref(db,'Transactions/')).key;
            set(ref(db,`Transactions/${newItemKey}`),{
                InorOut: 'In',
                ItemName: ItemName,
                Quantity: Qty,
                Time: formattedDateTime
            })
            setItemName('');
            setQty('');
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Successfully Added!',
                visibilityTime: 1500,
                autoHide: true
            });
        }
    }
    return (
        <View style={styles.pageview}>
            <Text style = {styles.heading}>
                Input new Item
            </Text>
            <TextInput
                placeholder="ItemName"
                style={styles.input}
                onChangeText={(text) => setItemName(text)}
                value= {ItemName}
                placeholderTextColor="#C70039"
            />
            <TextInput
                placeholder="Qty"
                style={styles.input}
                onChangeText={(text) => setQty(text)}
                value= {Qty}
                placeholderTextColor="#C70039"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={addItemFirebase}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
};

export default AddItem;