import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Platform,} from 'react-native'
import * as Haptics from 'expo-haptics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams } from '../App';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import {v4 as uuid} from 'uuid';
import { setDoc, doc, updateDoc, getDocs, collection, getDoc } from 'firebase/firestore';
import {db} from '../firebase-config';
import { UserContext } from '../Context/userContextFile';

const NoColocScreen = ()  => {
    const [user, setUser] = useContext(UserContext);
    const [nomColoc, setNomColoc] = React.useState(null);
    const [codeColoc, setCodeColoc] = React.useState(null);
    const[allColoc, setAllColoc] = React.useState([]);
    const navigation =
    useNavigation<StackNavigationProp<AuthStackParams>>();
    const handleCreateColoc = async () => {
        const userID = auth.currentUser.uid
        var colocID = uuid().substring(0, 6)
        while(allColoc.includes(colocID)){
            colocID = uuid().substring(0, 6)
        }
        const colocEntry = {
            id: colocID,
            nom: nomColoc,
            membersID: [userID],
        }
        await setDoc(doc(db, 'Colocs', colocID),colocEntry);
        await updateDoc(doc(db, 'Users', userID), {colocID: colocID, nomColoc: nomColoc});
        setUser({...user, colocID: colocID, nomColoc: nomColoc}) //a foutre coté serveur
    }

    const handleJoinColoc = async () => { //a foutre côté serveur ms ok pr le moment 
        if(!(allColoc.includes(codeColoc))){alert("Ce code n'existe pas !"); setCodeColoc("")}
        else {
            const colocData = await getDoc(doc(db, "Colocs", codeColoc));
            await updateDoc(doc(db, "Users", auth.currentUser.uid), {colocID: codeColoc, nomColoc: colocData.data().nom})
            var membersID = colocData.data().membersID;
            membersID.push(auth.currentUser.uid);
            await updateDoc(doc(db, "Colocs", codeColoc), {membersID: membersID});
            setUser({...user, colocID: codeColoc, nomColoc: colocData.data().nom})
        }
    }

    useEffect(() => {//a foutre ABSOLUMENT coté serveur mdr
        const getData = async ()=> {
            const data = await getDocs(collection(db, 'Colocs'));
            setAllColoc(data.docs.map(d => d.id))
        } 
        getData();
    }, [])
    return(
        
        <KeyboardAwareScrollView contentContainerStyle={{flex:1}} extraScrollHeight={70} resetScrollToCoords={{x:0,y:-200}}>
        <SafeAreaView style= {{backgroundColor: '#EDF0FA', paddingBottom:Platform.OS === 'android' ? 25:0}}>
        <View style={styles.container}>
            <View style={styles.creerColocContainer}>
                <Text style={styles.texteBlanc}>Crée ta coloc</Text>
                <TextInput
                style={styles.inputBlanc}
                onChangeText={(event) => {setNomColoc(event)}}
                value={nomColoc}
                placeholder="Choisir un nom pour la coloc"
                placeholderTextColor='lightgrey'
                />
                <View style={styles.ButtonBlanc}>
                    <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); handleCreateColoc();}}>
                    <Text style={styles.texteCreer}>C'est parti !</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.rejoindreColocContainer}>
                <Text style={styles.texteNoir}>Rejoins ta coloc</Text>
                
                <TextInput
                style={styles.inputGris}
                onChangeText={(event) => setCodeColoc(event)}
                value={codeColoc}
                placeholder="Entrer un code de coloc"
                placeholderTextColor='gray'
                />
                <View style={styles.ButtonBleu}>
                    <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); handleJoinColoc()}}>
                    <Text style={styles.texteRejoindre}>Rejoindre</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.ChangerCompte}>
            <TouchableOpacity onPress={()=> {navigation.navigate('Homepage'); signOut(auth)}}>
                <Text>Changer de compte</Text>
            </TouchableOpacity>
            </View>
            

        </View>
        </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({

    container: {
        backgroundColor:'#EDF0FA',
        flexDirection:'column',
        padding:25,
        alignItems:'center',
        justifyContent:'center',
        height:'100%'
        },
    creerColocContainer:{
        paddingTop:30,
        paddingBottom:30,
        paddingLeft:20,
        paddingRight:20,
        marginBottom:15,
        marginTop:15,
        backgroundColor:'#172ACE',
        borderRadius:15,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        elevation:5,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width:'100%'
    },
    rejoindreColocContainer:{
        marginBottom:15,
        marginTop:15,
        paddingTop:30,
        paddingBottom:30,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'white',
        borderRadius:15,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        elevation:2,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width:'100%'
    },
    inputBlanc: {
        height: 44,
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        
    },
    inputGris: {
        height: 44,
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#E8E8E8',
        
    },
    texteBlanc:{
        color:'white',
        fontSize:30
    },
    texteNoir:{
        color:'black',
        fontSize:30
    },
    texteCreer: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
      },
      texteRejoindre: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
      },
    ButtonBlanc: {
        marginTop:50,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        width: 154,
        justifyContent: 'center',
    },
    ButtonBleu: {
        marginTop:50,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#172ACE',
        width: 154,
        justifyContent: 'center',
    },
    ChangerCompte:{
        marginTop:50,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        width: 154,
        justifyContent: 'center',
        alignItems:'center',
        elevation:2,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }

})
export default NoColocScreen;

