import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Button, Modal, TouchableOpacity} from 'react-native';  
  
const Testt = () => {  
  state = {  
    isVisible: true, //state of modal default false  
  }  
    return (  
      <View style = {styles.centeredView}>  
        <Modal            
          animationType = {"fade"}  
          transparent = {false}  
          visible = {this.state.isVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          {/*All views of Modal*/}  
              <View style = {styles.modal}>  
              <Text style = {styles.text}>Modal is open!</Text>  
              <Button title="Click To Close Moal" onPress = {() => {  
                  this.setState({ isVisible:!this.state.isVisible})}}/>  
              <Text style={styles.heading}>ITEMS LIST</Text>
          </View>  
        </Modal>  
        {/*Button will change state to true and view will re-render*/}  
        <Button   
           title="Click To Open Modal"   
           onPress = {() => {this.setState({ isVisible: true})}}  
        />  
      </View>  
    );  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor: '#ecf0f1',
    height: 100,
    width: 300
  },  
  centeredView: {
    flex: 1, // Optional, fills parent if no dimensions are set
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {  
  justifyContent: 'center',  
  alignItems: 'center',   
  backgroundColor : "#00BCD4",   
  height: 300 ,  
  width: '80%',  
  borderRadius:10,  
  borderWidth: 1,  
  borderColor: '#fff'    
   
   },  
   text: {  
      color: '#3f2949',  
   }  
}); 

export default Testt;