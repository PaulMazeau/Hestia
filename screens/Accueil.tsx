import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ImageBackground} from 'react-native';
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
import Notif from '../notifications'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const MyLoader = () => ( 
  <ContentLoader 
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  >
  <Rect x="0" y="0" rx="10" ry="10" width="100%" height="70" />
  </ContentLoader>)

//importer l'image de maison

//importer la bg image dégradé
const image = require('../Img/homepage_bg_accueil.png');

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
                <View>
                    {MyLoader()}
                </View>
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
  
    
  return (
    <View style={styles.body}>
        
        <ImageBackground source={image} resizeMode="cover" style={styles.first50} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
           
            < Top  name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
        </ImageBackground>
    
    
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
        height: windowHeight /2.3,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
      
    ImageContainer: {
        height: windowHeight/3.5,
        width: 370,
        overflow: 'hidden',
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop: 'auto',
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
