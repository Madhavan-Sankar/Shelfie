import { StyleSheet , Dimensions} from 'react-native';

export default StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontSize: 25, 
        color: '#000000',
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    pageview: {
      flex: 1,
      backgroundColor: '#DAF7A6',
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center'

    },
    closeButtonText:{
      color: '#eb1405',
      fontSize:23
    },
    button: {
      backgroundColor: '#fc3d03',
      padding: 10,
      borderRadius: 20,
      borderCurve: 20,
      marginTop: 20
    },
    buttonadd: {
      backgroundColor: '#52fc03',
      width: 60,
      height: 35,
      borderRadius: 20
    },
    buttondelete: {
      backgroundColor: '#fc3d03',
      width: 60,
      height: 35,
      borderRadius: 20
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
    },
    list: {
        borderColor: 'red',
        borderWidth: 1,
        height: 200, 
        width: Dimensions.get('window').width-30,
        height: 30,

    },
    listItem: {
        backgroundColor: '#DBCBD8',
        padding: 5,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 5,
        borderRadius: 20,
        width: 200,
    },
    listItemText: {
        color: '#BB0A21',
        fontSize: 16,
        textTransform: 'uppercase',
      },
    
    input: {
        fontSize: 20,
        borderColor: '#C70039',
        borderWidth: 1,
        color: '#900C3F',
        placeholderTextColor : "#C70039",
        width: Dimensions.get('window').width - 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    inputstyle: {
        width: Dimensions.get('window').width - 20,
    }
  });
