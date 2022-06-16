import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Dimensions, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';
import { SegmentedControl, Colors, Assets, Spacings, BorderRadiuses } from 'react-native-ui-lib';
import GlobalTask from '../components/GlobalTask';
import MesTask from '../components/MesTask';
import TaskCalendar from '../components/TaskCalendar';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AddTaskBS from '../components/AddTaskBS';
import AddButton from '../Icons/AddButton.svg'
import TacheCard from '../components/TacheCard';

 const TacheScreen = () => {

  const sheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ['85%'];

  const handleSnapPress = useCallback ((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);


  const [show, setShow] = React.useState(true);

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);


  return (
      
      <View style={styles.container}>

          <Top/>
              <Text style={styles.screenTitle}>Tâche à faire</Text>

                <TaskCalendar/>
                
              <SegmentedControl 
              containerStyle={styles.control}
              segments={[{label: 'Tâches générales'}, {label: 'Mes tâches'}]}
              onChangeIndex={onChangeIndex}
              initialIndex={0}
              activeColor='black'
              borderRadius={BorderRadiuses.br20}
              backgroundColor='white'
              activeBackgroundColor='rgba(23,42,206,0.27)'
              inactiveColor='black'
              outlineColor= 'white'
              outlineWidth= {2}
              throttleTime= {100}
              />
              
           
              {show ? <GlobalTask/> : <MesTask/> }
              
             
         
{/*<TouchableOpacity onPress={() => handleSnapPress(0)} style= {styles.AddButton}>
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
          <AddTaskBS/>
        </BottomSheetView>
      </BottomSheet>

*/} 
      </View>

    
  );
};

const styles = StyleSheet.create({

    Body: {
      backgroundColor: '#EDF0FA',
    },

    SousTitre: {
      marginLeft: 15,
      marginTop: 5,
    },

    Titre: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
    },

    input: {
      height: 44,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 14,
    },

    BottomSheet: {
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10, 
    },

    container: {
      marginLeft: 16,
      marginRight: 16,
      backgroundColor: '#EDF0FA',
      flex: 1,
      },

      
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }, 

    control: {
      marginBottom: 15,
    },

    CategoriePeriode:{
      fontSize: 19,
      fontWeight: 'bold',
      marginTop: 24,
    },

    CategorieRecurrente:{
      fontSize: 19,
      fontWeight: 'bold',
    },
    
    AddButton: {
      
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      margin: 15,
    }
})

export default TacheScreen;

