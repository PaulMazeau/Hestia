import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/HeaderClear';
import TacheCard from '../components/TacheCard';
import MonSolde from '../components/MonSolde';
import { orderBy, limit, collection, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import Selection from '../components/Selection';
import MiniJeu from '../components/MiniJeu';
import { ScrollView } from 'react-native-gesture-handler';
import {UserContext } from '../Context/userContextFile';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as Notifications from 'expo-notifications';
import Notif from '../notifications'
//importer l'image de maison
const ProfilImage=require('../Img/Apartment5.7.png');

const windowHeight = Dimensions.get('window').height;


type Props = NativeStackScreenProps<RootStackParams, 'AccueilStack'>;

const AccueilScreen = ({ route, navigation }: Props) => {
    const [user, setUser] = useContext(UserContext);
    const [tache, setTache] = useState(null);
    //récupère la tache a venir de luser
 
    const q = query(collection(db, "Colocs/" + user.colocID + "/Taches"), where('nextOne', '==', user.uuid), orderBy('date', 'desc'), limit(1));
    const [nextTask, loading] = useCollection(q);
    //rendu de la tachecard a venir de luser
    const renderTache = () => {
        if(loading){
            return(
                <Text>LOADING</Text>
            )
        }
        if(nextTask){
            if(nextTask.docs.length>0){
                return(
                    nextTask.docs.map((t)=>{
                        return(
                            <TacheCard Tache={t.data().desc} key ={t.id} nextOne={t.data().nextOne} date={t.data().date}/>
                        )
                    })
                )
            }

        }
        return(
            <TacheCard Tache="Rien à venir...." nextOne={auth.currentUser.uid} />
        )
    }
    
    const getNotifData = async () => {
        const notifs = await Notifications.getAllScheduledNotificationsAsync();
        console.log(notifs);
    }
  return (
    <View style={styles.body}>
        
        <View style={styles.first50}>
           
            < Top  name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
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
                <MonSolde solde={user.solde} avatar={user.avatarUrl}/>
                <MiniJeu/>
            </View>

            <View style={styles.Categorie}>
                <Text style={styles.TitreCategorie}>Ta prochaine Tâche</Text>
                {renderTache()}
            </View>
           <Notif />
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
        height: windowHeight /2.4,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
      
    ImageContainer: {
        height: 200,
        width: 370,
        overflow: 'hidden',
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: -20,
    },

    Image: {
        height: '100%',
        width: '100%',
        transform: [{ translateX: -3}],
    },

    CategorieBottom: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})




export default AccueilScreen;
