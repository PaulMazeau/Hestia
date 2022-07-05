import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';


//importer l'image de maison
const ProfilImage=require('../Img/Apartment2.png');


type Props = NativeStackScreenProps<RootStackParams, 'AccueilStack'>;

const AccueilScreen = ({ route, navigation }: Props) => {
    const[tache, setTache] = useState("")
    const[solde, setSolde] = useState("...")
    const [avatar, setAvatar] = useState("");
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
          setAvatar(data.data().avatarUrl)
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
           
            < Top  name={route.params.username} clcName={route.params.clcName} avatar={avatar}/>
            <ImageContainer image={ProfilImage} />
        </View>
    
    
        <View style={styles.container}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >  
            <View>
            <Text style={styles.TitreCategorie}>La selection du mois</Text>
                <Selection/>
            </View>

            <View style={styles.CategorieBottom}>
                <MonSolde solde={solde}/>
                <MiniJeu/>
            </View>

            <View style={styles.Categorie}>
                <Text style={styles.TitreCategorie}>Ta prochaine Tâche</Text>
                <TacheCard Tache={tache}/>
            </View>
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
    body:{
        flex: 1,
        backgroundColor: '#EDF0FA',
    },

    container: {
        flex: 1,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
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
        marginBottom: 10
    },

    first50:{
        backgroundColor: '#172ACE',
        flex: .9,
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
        marginTop: -10
    },

    Image: {
        height: '100%',
        width: '100%',
    },

    CategorieBottom: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})




export default AccueilScreen;