import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/HeaderClear';
import TacheCard from '../components/TacheCard';
import MonSolde from '../components/MonSolde';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import Selection from '../components/Selection';
import MiniJeu from '../components/MiniJeu';
import { useFocusEffect } from '@react-navigation/native';


//importer l'image de maison
const ProfilImage=require('../Img/Home.png');


type Props = NativeStackScreenProps<RootStackParams, 'AccueilStack'>;

const AccueilScreen = ({ route, navigation }: Props) => {
    const[tache, setTache] = useState("")
    const[solde, setSolde] = useState("...")
    // useEffect( ()=> {
    //     const getData = async () => {
    //       const data = await getDoc(doc(db, "Users", auth.currentUser.uid));
          
    //       setTache(data.data().tache)
    //       setSolde(data.data().solde)
    //     }
    //     getData();
    // })
    //on guette la data dès que le screen est focus
    useFocusEffect(
        React.useCallback(() => {
        const getData = async () => {
          const data = await getDoc(doc(db, "Users", auth.currentUser.uid));
          
          setTache(data.data().tache)
          setSolde(data.data().solde)
        }
        getData();
    
          return () => {
            // screen unfocus
    
          };
        }, [])
      );
  return (
    <View style={styles.body}>
        
        <View style={styles.first50}>
           
            < Top  name={route.params.username} clcName={route.params.clcName}/>
            <ImageContainer image={ProfilImage} />
        </View>
 
        <View style={styles.container}>
            <View style={styles.Categorie}>
                <Text style={styles.TitreCategorie}>Ma prochaine Tâche</Text>
                <TacheCard Tache={tache}/>
            </View>

            <View>
            <Text style={styles.TitreCategorie}>La selection du mois</Text>
                <Selection/>
            </View>

            <View style={styles.CategorieBottom}>
                <MonSolde solde={solde}/>
                <MiniJeu/>
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
        backgroundColor: '#EDF0FA',
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
        flex: 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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

    CategorieBottom: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})




export default AccueilScreen;