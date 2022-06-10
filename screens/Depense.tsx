import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import TacheCard from '../components/TacheCard';
import Top from '../components/Header';




const DepenseScreen = () => {

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
        
          <Text style={styles.screenTitle}>Gestion des dépenses</Text>
          <Button title="Ajouter une tâche" onPress={buttonPressed} />

          <TacheCard/>


          <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
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

export default DepenseScreen;