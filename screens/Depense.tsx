import React, { useCallback, useContext} from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl } from 'react-native-ui-lib';
import DepenseGlobal from '../components/DepenseGlobal';
import { RootStackParams } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserContext } from '../Context/userContextFile';
import PageEquilibrage from '../components/PageEquilibrage';


type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

const DepenseScreen = ({ route, navigation }: Props) => {
  const [user, setUser] = useContext(UserContext); 
  const[userList, setUserList] = React.useState([]);
  const [show, setShow] = React.useState(true);
  
  const segments = {second: [{label: 'Equilibrage dépenses'}, {label: 'Dépenses générales'}]}
  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);

 

  return (      
      <View style={styles.container}>
     < Top  name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
          <Text style={styles.screenTitle} >Gestion des dépenses</Text>
          
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
    
          {show ? <PageEquilibrage /> : <DepenseGlobal clcID={user.colocID} />}
      
       
     

        </View>
  );
};

const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor:'#EDF0FA'
  },

  screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      marginTop: 10,
      marginLeft: 16,
      marginRight: 16,
  },

  control: {
    marginBottom: 15,
    marginLeft: 16,
    marginRight: 16,
  },

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
  },

})

export default DepenseScreen;


