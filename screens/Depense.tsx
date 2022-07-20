import React, { useCallback, useContext, useEffect} from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl } from 'react-native-ui-lib';
import DepenseGlobal from '../components/DepenseGlobal';
import { RootStackParams } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserContext, UserListContext } from '../Context/userContextFile';
import PageEquilibrage from '../components/PageEquilibrage';
import { getDoc, doc, query, collection, where, getDocs } from 'firebase/firestore';
import {db} from '../firebase-config'


type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

const DepenseScreen = ({ route, navigation }: Props) => {
  const [user, setUser] = useContext(UserContext); 
  const[userList, setUserList] = React.useState([]);
  const [show, setShow] = React.useState(true);
  
  const segments = {second: [{label: 'Equilibrage dépenses'}, {label: 'Dépenses générales'}]}
  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);


  useEffect(()=> {
    const getUsers = async () => {
      const data = await getDoc(doc(db, "Colocs", user.colocID));
      const membersID = data.data().membersID;
      const q = query(collection(db, "Users"), where('uuid', 'in', membersID))
      const querySnapshot = await getDocs(q);
      setUserList(querySnapshot.docs.map((doc) => ({...doc.data()})));
    }
    getUsers();

  }, [])

  return (      
      <View style={styles.container}>
     < Top  name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
          <Text style={styles.screenTitle}>Gestion des dépenses</Text>
          
          <SegmentedControl 
        onChangeIndex={onChangeIndex}
        initialIndex={0}
        containerStyle={styles.control}
        segments={segments.second}
        activeColor='black'
        borderRadius={BorderRadiuses.br20}
        backgroundColor='white'
        activeBackgroundColor='rgba(23,42,206,0.27)'
        inactiveColor='black'
        outlineColor= 'white'
        outlineWidth= {2}
        throttleTime= {200}
        />
    
          {show ? <PageEquilibrage userList ={userList} clcID= {user.colocID}/> : <DepenseGlobal clcID={user.colocID}/>}
      
       
     

        </View>
  );
};

const styles = StyleSheet.create({

  container: {
      paddingLeft: 16,
      paddingRight: 16,
      flex: 1,
      backgroundColor:'#EDF0FA'
  },

  screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      marginTop: 10,
  },


  control: {
    marginBottom: 15,
  },

  Title:  {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  
  VoirToutes: {
  fontSize: 14,
  color: '#8F8F8F',
  },


AddButton: {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  height: 0,
  marginBottom: 10,
},

contentContainer: {
  flex: 1,
  alignItems: 'center',
  zIndex: 2,
},
})

export default DepenseScreen;


