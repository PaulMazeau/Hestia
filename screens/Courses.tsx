import React, { useCallback, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CourseCard from '../components/CourseCard';
import { RootStackParams } from '../App';
import Top from '../components/HeaderDark';
import AddButton from '../Icons/AddButton.svg';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddListCourseBS from '../components/AddListCourseBS';

type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const CoursesScreen = ({navigation}: Props) => {

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

  return (
 <View style={styles.Body}>
    <Top/>
    <View style={styles.container}>
        
        <Text style={styles.screenTitle}>Listes de Course</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        
            <CourseCard name="Liste de Course 1" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 2" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 3" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 4" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 5" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 6" onPress={name => navigation.navigate('Course', {name})}/>
            
        </ScrollView>
    </View>

    <TouchableOpacity onPress={buttonPressed} style= {styles.AddButton}>
          <AddButton /> 
        </TouchableOpacity>

        <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['55%']}
        index= {0}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <AddListCourseBS/>
        </View>
      </BottomSheetModal>
        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    screenTitle: {
    fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    
    Body: {
      backgroundColor: '#EDF0FA',
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
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

export default CoursesScreen;