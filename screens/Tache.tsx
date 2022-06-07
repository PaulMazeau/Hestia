import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../App';
import CourseCard from '../components/CourseCard';
import BottomSheetModal, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { RoundedCheckbox, PureRoundedCheckbox } from "react-native-rounded-checkbox";



type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;



 const TacheScreen = ({navigation}: Props) => {

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['5%', '50%'], []);

  const buttonPressed = () => {
    bottomSheetRef.current?.expand();
  }

  const renderBackDrop = useCallback((props) => {
    return (    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
     />
     );
  }, []);

  return (
  <View style={styles.container}>
      <Text style={styles.screenTitle}>Tâche à faire</Text>
      <Button title="Ajouter une tâche" onPress={buttonPressed} />
      <RoundedCheckbox onPress={(checked) => console.log("Checked: ", checked)} />
      <CourseCard name="Tache 1" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 2" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 3" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 4" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 5" onPress={name => navigation.navigate('Course', {name})}/>

     
  

     

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackDrop}
      >
        <View style={styles.BottomSheet}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>

    </View>

  );
};

const styles = StyleSheet.create({
    BottomSheet: {
        padding: 10,
    },

    container: {
        flex: 1,
        padding: 16,
        marginTop: 24,
    },
    screenTitle: {
        fontSize: 24,
        marginTop: 8,
        fontWeight: 'bold',
    }
})

export default TacheScreen;