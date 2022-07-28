import React, { useContext, useEffect, useReducer, useState, } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ListRenderItem, Platform, ToastAndroid} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { FlatList, ScrollView, Switch } from 'react-native-gesture-handler';
import { RootStackParams } from '../App';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import Top from '../components/HeaderSettings';
import Exit from '../Icons/Exit.svg';
import TopBackNavigation from '../components/TopBackNavigation';
import { getDoc, doc, query, collection, where, getDocs, deleteDoc, updateDoc, increment, arrayRemove  } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserContext } from '../Context/userContextFile';
import {useToast} from 'react-native-toast-notifications';
import Copy from '../Icons/copy.svg';

type Props = NativeStackScreenProps<RootStackParams, 'ColocSettings'>;

const data : Image[] = [
    require('../Img/avatar1.png'),
    require('../Img/avatar2.png'),
    require('../Img/avatar3.png'),
    require('../Img/test1.png'),
    require('../Img/test2.png')
];



const ColocSettings = ({route, navigation}: Props) => {
    const [user, setUser] = useContext(UserContext);
    const [avatars, setAvatars] = useState([]); //list des avatars url de la coloc
    const toast = useToast();

    const copyText = (text) => {
        Clipboard.setStringAsync(text);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
       toast.show('Le texte a été copié !', {
        type: "normal",})
    };
    

    useEffect(()=> {
        const getData = async () => {
            const data = await getDoc(doc(db, "Colocs", user.colocID));
            const membersID = data.data().membersID;
            const q = query(collection(db, "Users"), where('uuid', 'in', membersID))
            const querySnapshot = await getDocs(q);
            setAvatars(querySnapshot.docs.map((doc)=> doc.data()));
                }
        getData();
    }, [])

    const handleLeaveColoc = async () => { //update des docs des autres membres coté serveurrs
        const tacheQuery = query(collection(db, 'Colocs/'+ user.colocID +'/Taches'), where('concerned', 'array-contains', user.uuid));
        const transacQuery = query(collection(db, 'Colocs/'+user.colocID+'/Transactions'), where('concerned', 'array-contains', user.uuid));
        const tacheSnapshot = await getDocs(tacheQuery);
        const transacSnapshot = await getDocs(transacQuery);//a foutre coté serveur
        tacheSnapshot.forEach(async (t) => {await deleteDoc(doc(db, 'Colocs/' + user.colocID + '/Taches', t.id))})
        transacSnapshot.forEach(async (t) => {await deleteDoc(doc(db, 'Colocs/' + user.colocID + '/Transactions', t.id));
    });
        await updateDoc(doc(db, 'Colocs', user.colocID), {membersID: arrayRemove(user.uuid)});
        await updateDoc(doc(db, 'Users', user.uuid), {colocID: "0", nomColoc: "", membersID: []});
        setUser({...user, colocID: "0", membersID: []});
    }
  return (
    

    
    <View style={styles.Body}>
        <Top clcName={user.nomColoc} avatar={user.avatarUrl} name={user.nom}/>
        <View style={styles.container}>
        <View style={styles.Title}>
          <TopBackNavigation/>
          <Text style={styles.screenTitle}>Paramètres de la colocation</Text>
        </View>
        <View style={styles.containerColoc}>
            <FlatList 
                data={avatars} 
                renderItem={renderItem} 
                numColumns={3}   
                columnWrapperStyle={{justifyContent:'space-around'}}
                scrollEnabled= {false}
            ></FlatList>
           

        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => {copyText(user.colocID)}} activeOpacity={0.5}>
        <View style={[styles.Setting, {marginTop:15}]}>
            <Text style={styles.name}>Code de la colocation : </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={ styles.codeColoc}>
                    <Copy height={20} width={21}/>
                    <Text style={styles.chiffre}>{user.colocID}</Text>
                </View>
            </View>
            
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {copyText("support@hestiapp.fr")}} activeOpacity={0.5}>
        <View style={[styles.Setting, {marginTop:1}]}>
            <Text style={styles.name}>Contact : </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={styles.support}>support@hestiapp.fr</Text>
            </View>
            
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLeaveColoc()}>
            <View style={styles.Quitter}>
                <Exit/>
                <Text style={{fontWeight: '700', color:'white'}}>Quitter la colocation</Text>
            </View>
        </TouchableOpacity>
        </ScrollView>
        </View>
    </View>
  );
};

const renderItem : ListRenderItem<any> = ({item}) => {
    return (
    <View style={styles.colocataire} key={item}>
        <View style={styles.ImageContainer} key={item}>
        <Image source={{uri: item.avatarUrl}} style={styles.Image} key={item}/>
        </View>
        <Text style={styles.nom}> {item.nom} </Text>
     </View>
        );
};

const styles = StyleSheet.create({
    Body:{
      flex: 1,
      backgroundColor: '#EDF0FA',
    },

    addButton:{
        margin:10,
        flexDirection:'row', 
        justifyContent:"center",
        top:-30,
    },

    codeColoc:{
        backgroundColor:'grey', 
        borderRadius:5, 
        color:'white', 
        fontSize:15, 
        padding:5, 
        paddingLeft:10, 
        paddingRight:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    container: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#EDF0FA',
        height: '100%',
        flex: 1
    },

    containerColoc: {
        height: 'auto',
        backgroundColor: 'blue',
        borderRadius: 13,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 35,
        
    },

    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
    },

    name:{
        fontWeight: '700',
    },
    chiffre:{
        fontWeight: '700',
        fontSize:17,
        color:'white',
        marginLeft:10
    },

    support:{
        fontWeight: '400',
        fontSize:17,
        color:'black',
        marginLeft:10,
        textDecorationLine: 'underline'
    },

    Setting: {
        backgroundColor: "white",
        paddingLeft: 15,
        paddingRight:15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginBottom: 10,
        marginTop: 10
    },

    Quitter:{
        backgroundColor: "#CE1717",
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginBottom: 20, 
        marginTop:4  
    },

    ImageContainer: {
        height: 95,
        width: 95,
        borderRadius: 13,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'flex-end',
    },

    Image: {
        height: '100%',
        width: '100%',   
    },

    Title: {
        flexDirection : 'row', 
    },

    nom: {
        color: 'white',
        fontSize: 13,
        alignItems: 'center',
        marginTop: 5,
        fontWeight: '700'
    },

    colocataire: {
        alignItems: 'center',
        margin: 6
    }
})

export default ColocSettings;