import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput} from 'react-native';
import { RootStackParams } from '../App';
import BottomSheetModal, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/Header';
import AddButton from '../Icons/AddButton.svg'
import { SegmentedControl, Colors, Assets, Spacings, BorderRadiuses } from 'react-native-ui-lib';



type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

 const TacheScreen = () => {

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const buttonPressed = () => {
    bottomSheetRef.current?.expand();
  }

  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);


  const renderBackDrop = useCallback((props) => {
    return (    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
     />
     );
  }, []);

  return (
    <View>
        

      <Top/>
      <View style={styles.container}>
          <View style={styles.Header}>
            <Text style={styles.screenTitle}>Tâche à faire</Text>
            <AddButton width={60} height={60} onPress={buttonPressed}/>
          </View>

          
        <SegmentedControl 
        containerStyle={styles.control}
        segments={[{label: 'Tâches générales'}, {label: 'Mes tâches'}]}
        activeColor='black'
        borderRadius={BorderRadiuses.br20}
        backgroundColor='white'
        activeBackgroundColor='rgba(23,42,206,0.27)'
        inactiveColor='black'
        outlineColor= 'rgba(23,42,206,0)'
        />
        
        <ScrollView showsVerticalScrollIndicator={false}>
    
          <TacheCard />
          <TacheCard />
          <TacheCard />
          <TacheCard />
          <TacheCard />
        
          

        </ScrollView>
      
      <BottomSheetModal
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackDrop}
      >
        <View style={styles.BottomSheet}>
          <Text style={styles.Titre}>Nouvelle Tâche Ménagère</Text>
          <Text style={styles.SousTitre}>Titre</Text>
          <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text style={styles.SousTitre}>Date</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Text style={styles.SousTitre}>Tags</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Text style={styles.SousTitre}>Notifications</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />

      
      <Button
      title="Ajouter la tâche" 
      onPress={buttonPressed} 
      />

        </View>
      </BottomSheetModal>
      </View>
      
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

    input: {
      height: 44,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 14,
    },

    BottomSheet: {
        padding: 10,
    },

    container: {
        padding: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }, 
    Header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 15
    },

    control: {
      marginBottom: 15,
    },
})

export default TacheScreen;