import React, { useCallback} from 'react';
import {View, Text, StyleSheet, Button,} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl } from 'react-native-ui-lib';
import DepensePerso from '../components/DepensePersonnel';
import DepenseGlobal from '../components/DepenseGlobal';




const DepenseScreen = () => {

  const [show, setShow] = React.useState(true);
  
  const segments = {second: [{label: 'Dépenses Générales'}, {label: 'Mes Dépenses'}]}

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);

  return (
  <View>
        <Top/>
      <View style={styles.container}>
        
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
        />
    
          {show ? <DepenseGlobal/> : <DepensePerso/>}
        
       
        </View>
      
    </View>



  );
};

const styles = StyleSheet.create({

  container: {
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
  },
  screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
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
})

export default DepenseScreen;


