import React, { useContext, useEffect, useReducer, useState, } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ListRenderItem, Platform, ToastAndroid} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { FlatList, ScrollView, Switch } from 'react-native-gesture-handler';
import { RootStackParams } from '../App';
import * as Clipboard from 'expo-clipboard';
import Top from '../components/HeaderSettings';
import Exit from '../Icons/Exit.svg';
import TopBackNavigation from '../components/TopBackNavigation';
import { getDoc, doc, query, collection, where, getDocs, deleteDoc, updateDoc, increment, arrayRemove  } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserContext } from '../Context/userContextFile';
import { Background } from 'victory-native';



type Props = NativeStackScreenProps<RootStackParams, 'ColocSettings'>;
const ProfilImage=require('../Img/avatarHeader.png');



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
    const [inputValue, setInputValue] = useState("");

    const copyText = (text) => {
        Clipboard.setString(text);
        if (Platform.OS != 'android') {
            
        } else {
            ToastAndroid.showWithGravity("Texte copié", ToastAndroid.LONG, ToastAndroid.CENTER);
        }
        //navigator.clipboard.writeText(text);
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

    const handleLeaveColoc = async () => {
        const tacheQuery = query(collection(db, 'Colocs/'+ user.colocID +'/Taches'), where('concerned', 'array-contains', user.uuid));
        const transacQuery = query(collection(db, 'Colocs/'+user.colocID+'/Transactions'), where('concerned', 'array-contains', user.uuid));
        const tacheSnapshot = await getDocs(tacheQuery);
        const transacSnapshot = await getDocs(transacQuery);//a foutre coté serveur
        tacheSnapshot.forEach(async (t) => {await deleteDoc(doc(db, 'Colocs/' + user.colocID + '/Taches', t.id))})
        transacSnapshot.forEach(async (t) => {await deleteDoc(doc(db, 'Colocs/' + user.colocID + '/Transactions', t.id));
         updateSolde(t)});
        await updateDoc(doc(db, 'Colocs', user.colocID), {membersID: arrayRemove(user.uuid)});
        await updateDoc(doc(db, 'Users', user.uuid), {colocID: "0", nomColoc: "", membersID: []});
        setUser({...user, colocID: "0", membersID: []});
        for(var i = 0; i<user.membersID; i++){ //a foutre coté serveur
            await updateDoc(doc(db, "Users", user.membersID[i]), {membersID: arrayRemove(user.uuid)})
        }
    }

    const updateSolde = async (docu) => {
        console.log("solde updated")
        const areConcerned  = docu.data().receiversID;
        const length = areConcerned.length;
        const amount = docu.data().amount;
        const payeur = docu.data().giverID;
        var payeurIsIn = false;
        for(var i = 0; i<length; i++){
          if(!(areConcerned[i]==payeur)){//si c pas le payeur
            await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(+amount/length)});
            
          }else {// si le payeur a payé pr lui aussi
            payeurIsIn = true;
            await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(-amount+(amount/length))});
          }
         
          }
          if(!payeurIsIn){
            await updateDoc(doc(db, "Users", payeur), {solde: increment(-amount)});
        }
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
                columnWrapperStyle={{justifyContent:'space-between'}}
                scrollEnabled= {false}
            ></FlatList>
           

        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.Setting, {marginTop:15}]}>
            <Text style={styles.name}>Code de la colocation : </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={() => {copyText(user.colocID)}}>
                    <Text style={[styles.name, styles.codeColoc]}>{user.colocID}</Text>
                </TouchableOpacity>
            </View>
            
        </View>

        <View style={styles.Setting}>
            <Text style={styles.name}>Thème sombre</Text>
            <Switch onValueChange={() => console.log('value changed')}></Switch>
        </View>

        <TouchableOpacity onPress={() => handleLeaveColoc()}>
            <View style={styles.Quitter}>
                <Exit></Exit>
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
        paddingRight:10
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
        fontWeight: '700'
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
        marginTop:10  
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