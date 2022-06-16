import React, { useCallback, useRef, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity,} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl } from 'react-native-ui-lib';
import DepensePerso from '../components/DepensePersonnel';
import DepenseGlobal from '../components/DepenseGlobal';
import AddButton from '../Icons/AddButton.svg'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AddDepenseBS from '../components/AddDepenseBS';


const DepenseScreen = () => {

  const sheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ['85%'];

  const handleSnapPress = useCallback ((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const [show, setShow] = React.useState(true);
  
  const segments = {second: [{label: 'Dépenses Générales'}, {label: 'Mes Dépenses'}]}

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);

  return (      
      <View style={styles.container}>
      <Top/>
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
    
          {show ? <DepenseGlobal/> : <DepensePerso/>}
        
       {/*  <TouchableOpacity onPress={() => handleSnapPress(0)} style= {styles.AddButton}>
          <AddButton /> 
        </TouchableOpacity>
      

        <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose = { () => setIsOpen(false)}
      style={styles.BottomSheet}
      >
        <BottomSheetView>
          <AddDepenseBS/>
        </BottomSheetView>
      </BottomSheet>

*/} 


        </View>
  );
};

const styles = StyleSheet.create({

  container: {
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      flex: 1
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

  Body:{
   
    backgroundColor: '#EDF0FA',
},

AddButton: {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  margin: 15,
},

BottomSheet: {
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10, 
  borderRadius: 70,
},
})

export default DepenseScreen;


