import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageComponent, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../App';
import Top from '../components/HeaderDark';
import Setting from '../components/Setting';
import { NavigationEvents } from 'react-navigation';


const ProfilImage=require('../Img/avatar1.png');

type Props = NativeStackScreenProps<RootStackParams, 'Settings'>;



const Settings = ({route, navigation}: Props) => {
  return (
    <View style={styles.Body}>
    <Top/>
    <View style={styles.container}>
        
        <Text style={styles.screenTitle}>Settings</Text>
        <ScrollView>
        <TouchableOpacity onPress={() => console.log("blabla")}>
          <View style={styles.avatar}>
            <Text style={styles.name}>Avatar</Text>
            <ImageContainer image={ProfilImage} />
          </View>
        </TouchableOpacity>
        <Setting name = "Romain Chawla" tag = "Prénom et nom" onPress={name => console.log("blabla")}></Setting>
        <Setting name = "romain.chawla@gmail.com" tag = "Email" onPress={name => console.log("blabla")}></Setting>
        <Setting name = "06 56 84 54 32" tag = "Téléphone" onPress={name => console.log("blabla")}></Setting>
        <Setting name = "02/03/2000" tag = "Date de naissance" onPress={name => console.log("blabla")}></Setting>
        </ScrollView>
    </View>
    </View>
  );
};

//importer l'image de maison
const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
  );

const styles = StyleSheet.create({
    Body:{
      flex: 1,
      backgroundColor: '#EDF0FA',
    },
    container: {
        paddingBottom: 16,
          paddingLeft: 16,
          paddingRight: 16,
        },
        screenTitle: {
        fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 15,
        },
        name:{
          fontWeight: '700'
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
          height: 30,
          width: 30,
          overflow: 'hidden',
          borderRadius: 90,
          justifyContent:'center',
          alignItems:'flex-end',
        },
        Image: {
          height: '100%',
          width: '100%',
        },
})

export default Settings;