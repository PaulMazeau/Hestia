import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Top from '../components/HeaderDark';
import { SegmentedControl, BorderRadiuses } from 'react-native-ui-lib';
import GlobalTask from '../components/GlobalTask';
import MesTask from '../components/MesTask';
import TaskCalendar from '../components/TaskCalendar';
import { getDoc, doc  } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { RootStackParams } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams, 'TacheStack'>;

 const TacheScreen = ({route, navigation}: Props) => {

  const [show, setShow] = React.useState(true);

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);

 
  


  return (

      <View style={styles.container}>

          <Top name={route.params.username} clcName={route.params.clcName}/>
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
              {show ? <GlobalTask clcID={route.params.clcID}/> : <MesTask/> }

      </View>

  );
};

const styles = StyleSheet.create({

    container: {
      paddingLeft: 16,
      paddingRight: 16,
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
})

export default TacheScreen;

