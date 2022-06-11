import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/HeaderClear';
import { ScrollView } from 'react-native-gesture-handler';
import AddButton from '../Icons/AddButton.svg'
import TacheCard from '../components/TacheCard';
import MonSolde from '../components/MonSolde';


//importer l'image de maison
const ProfilImage=require('../Img/Home.png');


type Props = NativeStackScreenProps<RootStackParams, 'AccueilStack'>;

const AccueilScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.body}>
        
        <View style={styles.first50}>
           
            < Top/>
            <Text style={styles.Titre}>Welcome Back</Text>
            <ImageContainer image={ProfilImage} />
        </View>
            
        <View style={styles.container}>
                <View style={styles.Categorie}>
                    <Text style={styles.TitreCategorie}>Ma prochaine Tâche</Text>
                    <TacheCard/>
                </View>
                <View style={styles.Categorie}>
                    <Text style={styles.TitreCategorie}>Mes dépenses</Text>
                    <MonSolde/>
                </View>
                
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
    body:{
        flex: 1,
    },

    container: {
        flex: 1,
        padding: 16,
    },

    Categorie: {
        marginBottom: 15,
    },

    Titre: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
        paddingLeft: 16,
    },

    TitreCategorie: {
        fontSize: 19,
        fontWeight: 'bold',
    },

    first50:{
        backgroundColor: '#172ACE',
        flex: 1.3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
      
    ImageContainer: {
        height: 230,
        width: 313,
        overflow: 'hidden',
        borderRadius: 90,
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
    },
    Image: {
        height: '100%',
        width: '100%',
    },
})




export default AccueilScreen;