import React, { useCallback, useRef, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity,} from 'react-native';
import Top from '../components/HeaderClear';
import { BorderRadiuses, SegmentedControl } from 'react-native-ui-lib';
import DepensePerso from '../components/DepensePersonnel';
import DepenseGlobal from '../components/DepenseGlobal';
import AddButton from '../Icons/AddButton.svg'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import AddDepenseBS from '../components/AddDepenseBS';


const DepenseScreen = () => {

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  }, []);

  const buttonPressed = () => {
    bottomSheetRef.current?.present();
  }

  const [show, setShow] = React.useState(true);
  
  const segments = {second: [{label: 'Dépenses Générales'}, {label: 'Mes Dépenses'}]}

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);

  return (      
      <View style={styles.container}>
      <Top clear={false} name={"prenom"}/>
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


