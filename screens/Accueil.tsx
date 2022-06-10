import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import AddButton from '../Icons/AddButton.svg'
import TacheCard from '../components/TacheCard';


//importer l'image de maison
const ProfilImage=require('../Img/Home.png');


type Props = NativeStackScreenProps<RootStackParams, 'AccueilStack'>;

const AccueilScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.body}>
        
        <View style={styles.first50}>
           
            < Top/>
            <ImageContainer image={ProfilImage} />
        </View>
            
        <View style={styles.container}>

                <View style= {styles.Header}>
                    <Text style={styles.screenTitle}>Tâche à faire</Text>
                    <AddButton width={60} height={60}/>
                </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TacheCard/>
                <TacheCard/>
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
    container: {
        flex: 1,
        padding: 16,
    },
    CourseCard: {
        backgroundColor: '#efefef',
    }, 
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    first50:{
        backgroundColor: '#172ACE',
        flex: 1.5,
        borderBottomLeftRadius: 70,
    },
    body:{
        flex: 1,
    },
    Header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
      },
      
    ImageContainer: {
        height: 271,
        width: 368,
        overflow: 'hidden',
        borderRadius: 90,
    },
    Image: {
        height: '100%',
        width: '100%',
    },
})




export default AccueilScreen;