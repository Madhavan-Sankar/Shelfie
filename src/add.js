import styles from './style';
import { View, Text , TextInput, Touchable, Keyboard, Alert, TouchableOpacity} from "react-native";
import React , {useState,forwardRef} from "react";
import {db} from '../config'
import { get, query , ref , set, push} from "firebase/database";
import { useNavigation } from "@react-navigation/native"
import Toast from 'react-native-toast-message';

const AddItem = () => {
    const [ItemName, setItemName] = useState('');
    const [Qty, setQty] = useState('');
    const navigation = useNavigation();

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
            setItemName('');
            setQty('');
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Successfully Added!',
                visibilityTime: 1500,
                autoHide: true
            });
            setTimeout(() => {
                navigation.navigate('HomePage');
              }, 800);
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
                onChangeText={(text) => setItemName(text.toUpperCase())}
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