import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageComponent, Image, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/HeaderSettings';
import TopBackNavigation from '../components/TopBackNavigation';


const ProfilImage=require('../Img/avatar1.png');

type Props = NativeStackScreenProps<RootStackParams, 'Settings'>;



const Settings = () => {

  const [title, onChangeTitre] = React.useState(null);
  const [email, changeemail] = React.useState(null);
  const [motdepasse, resetmotdepasse] = React.useState(null);


  return (
    <View>
      <Top/>
    <View style={styles.container}>
    
    
        <View style={styles.Title}>
          <TopBackNavigation/>
          <Text style={styles.screenTitle}>Settings</Text>
        </View>

    <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Nom</Text>
        <TextInput
                style={styles.input}
                onChangeText={onChangeTitre}
                value={title}
                placeholder="Paul"
                
            />
      </View>

      <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Adresse Email</Text>
        <TextInput
                style={styles.input}
                onChangeText={changeemail}
                value={email}
                placeholder="pol.mzeau@gmail.com"
                
            />
      </View>

      <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Mot de passe</Text>
        <TextInput
                style={styles.input}
                onChangeText={resetmotdepasse}
                value={motdepasse}
                placeholder="********"
                
            />
      </View>

      <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Avatar</Text>
        <TouchableOpacity onPress={() => console.log("blabla")} style={{marginTop: 13}}>
          <View style={styles.avatar}>
            <Text style={styles.name}>Avatar</Text>
            <ImageContainer image={ProfilImage} />
          </View>
        </TouchableOpacity>
      </View>
        
        <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity onPress={() => console.log('Modifier!')} style={styles.ModifierButton}>
            <Text style={styles.Modifier}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
    
    </View>

    </View>
  );
};

//importer l'image de l'avatar
const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
  );

const styles = StyleSheet.create({
    
        container: {
          paddingBottom: 16,
          backgroundColor: '#EDF0FA',
          height: '100%',
          paddingLeft: 16,
          paddingRight: 16,
        },

        screenTitle: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 15,
        },

        input: {
          height: 44,
          marginTop: 13,
          padding: 10,
          borderRadius: 14,
          backgroundColor: 'white'
        },

        ChampSettings: {
          marginBottom: 15
      },

      subTitle: {
        fontSize: 16,
        fontWeight: '500'
      },

        avatar: {
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          marginBottom: 10,
        },

        ImageContainer: {
          height: 35,
          width: 35,
          overflow: 'hidden',
          borderRadius: 90,
          justifyContent:'center',
          alignItems:'flex-end',
        },

        Image: {
          height: '100%',
          width: '100%',
        },

        Title: {
          flexDirection : 'row', 
          marginBottom : 10,
        },

        name:{
          fontWeight: '700'
        },

        ModifierButton: {
          height: 40,
          borderRadius: 5,
          backgroundColor: '#172ACE',
          width: 154,
          justifyContent: 'center'
        },

        Modifier: {
          fontSize: 16,
          fontWeight: '600',
          color: 'white',
          textAlign: 'center',
        }

        
})

export default Settings;