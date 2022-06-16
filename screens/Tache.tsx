import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Dimensions, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';
import { SegmentedControl, Colors, Assets, Spacings, BorderRadiuses } from 'react-native-ui-lib';
import GlobalTask from '../components/GlobalTask';
import MesTask from '../components/MesTask';
import TaskCalendar from '../components/TaskCalendar';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import AddTaskBS from '../components/AddTaskBS';
import AddButton from '../Icons/AddButton.svg';

 const TacheScreen = () => {

   // ref
   const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [show, setShow] = React.useState(true);

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);

  const buttonPressed = () => {
    bottomSheetRef.current?.present();
  }

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
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
              
             
         
       <TouchableOpacity onPress={buttonPressed} style= {styles.AddButton}>
                <AddButton /> 
  </TouchableOpacity> 

        

          <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['90%']}
        index= {0}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <AddTaskBS/>
        </View>
      </BottomSheetModal>



      </View>


      

  
  );
};

const styles = StyleSheet.create({

    SousTitre: {
      marginLeft: 15,
      marginTop: 5,
    },

    Titre: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
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
      height: 0,
      marginBottom: 10
    },
    
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      zIndex: 2,
    },
})

export default TacheScreen;

