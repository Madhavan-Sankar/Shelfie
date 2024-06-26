import { StyleSheet , Dimensions} from 'react-native';

export default StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontSize: 22, 
        color: '#130273',
        paddingBottom: 10,
        fontWeight: 'semibold',
    },
    subheading: {
      textAlign: 'center',
      fontSize: 15, 
      color: '#130273',
      paddingBottom: 10,
      fontWeight: 'semibold',
    }, 
    pageview: {
      flex: 1,
      backgroundColor: '#CAD2C5',//whole app page background color
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
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
        height: Dimensions.get('window').height, 
        width: Dimensions.get('window').width-10,
        height: 100,
        borderRadius: 20,
        paddingHorizontal: 1,
    },
    listouterview:{
      marginTop: 10,
      borderColor: '#694A38',
      shadowRadius: 10,
      borderWidth: 1,
      padding:3,
      borderRadius: 10,
      width: '98%',
      flexDirection: 'row',
      backgroundColor: '#F5FAFD'
    },
    listinnerleftview:{
      alignItems: 'flex-start',
      width: '40%',
      marginLeft: 10,
    },
    listinnerrightview:{
      alignItems: 'flex-start',
      width: '60%',
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
        color: '#000000',
        fontSize: 16,
        textTransform: 'uppercase',
      },
    
    input: {
        fontSize: 20,
        borderColor: '#C70039',
        borderWidth: 1,
        color: '#900C3F',
        placeholderTextColor : "#C70039",
        width: Dimensions.get('window').width - 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    inputstyle: {
        width: Dimensions.get('window').width - 10,
    }
  });
