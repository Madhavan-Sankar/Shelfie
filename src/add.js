import styles from './style';
import { View, Text , TextInput, Touchable, Keyboard, Alert, TouchableOpacity} from "react-native";
import React , {useState} from "react";
import {db} from '../config'
import { ref , set, push} from "firebase/database";
import Toast from 'react-native-toast-message';

const AddItem = () => {
    const [ItemName, setItemName] = useState('');
    const [Qty, setQty] = useState('');
    const [time, setTime] = useState('');

    const currentTime = new Date();
    const day = currentTime.getDate();
    const month = currentTime.getMonth() + 1;
    const year = currentTime.getFullYear();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedDateTime = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    

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
                Quantity: Qty,
                Time: formattedDateTime
            });
            setItemName('');
            setQty('');
            setTime('');
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
}




export default AddItem