import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, ImageBackground} from 'react-native'
import * as Haptics from 'expo-haptics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParams } from '../App';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import {v4 as uuid} from 'uuid';
import { setDoc, doc, updateDoc, getDocs, collection, getDoc, arrayUnion } from 'firebase/firestore';
import {db} from '../firebase-config';
import { UserContext } from '../Context/userContextFile';

const image = require('../Img/homepage_bg.png');
const windowHeight = Dimensions.get('window').height;

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
        await updateDoc(doc(db, 'Users', userID), {colocID: colocID, nomColoc: nomColoc, membersID: [auth.currentUser.uid]});
        setUser({...user, colocID: colocID, nomColoc: nomColoc, membersID: auth.currentUser.uid}) 
    }

    const handleJoinColoc = async () => { //update de la prop membersID des autres membres coté serveurs
        const colocData = await getDoc(doc(db, "Colocs", codeColoc));
        if(!(colocData.exists())){alert("Ce code n'existe pas !"); setCodeColoc("")}
        else {
            var membersID = colocData.data().membersID;
            membersID.push(auth.currentUser.uid);
            await updateDoc(doc(db, "Users", auth.currentUser.uid), {colocID: codeColoc, nomColoc: colocData.data().nom, membersID: membersID})
            await updateDoc(doc(db, "Colocs", codeColoc), {membersID: membersID});
            setUser({...user, colocID: codeColoc, nomColoc: colocData.data().nom, membersID: membersID})
        }
    }
    return(

        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{flex:1}} extraScrollHeight={20} resetScrollToCoords={{x:0,y:-20}}>
            <ImageBackground source={image} resizeMode="cover" style={styles.creerColocContainer} imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                    
                    <Text style={styles.texteBlanc}>Créer une colocation</Text>
                        <TextInput
                        style={styles.inputBlanc}
                        onChangeText={(event) => {setNomColoc(event)}}
                        value={nomColoc}
                        placeholder="Choisir un nom pour la colocation"
                        placeholderTextColor='lightgrey'
                        />
                        <View style={styles.ButtonBlanc}>
                            <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); handleCreateColoc();}}>
                            <Text style={styles.texteCreer}>C'est parti !</Text>
                            </TouchableOpacity>
                        </View>
                    
                </ImageBackground>
           
                <View style={{alignItems: 'center', paddingLeft: 16, paddingRight: 16}}>

                    <Text style={styles.texteNoir}>Rejoindre ta colocation</Text>
                        <TextInput
                        style={styles.inputGris}
                        onChangeText={(event) => setCodeColoc(event)}
                        value={codeColoc}
                        placeholder="Entre un code de colocation"
                        placeholderTextColor='gray'
                        />

                    <View style={styles.ButtonBleu}>
                        <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); handleJoinColoc()}}>
                        <Text style={styles.texteRejoindre}>Rejoindre</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            
        
            <View style={{alignItems:'center', marginTop: windowHeight / 10}}>
                <View style={styles.ChangerCompte}>
                <TouchableOpacity onPress={()=> {navigation.navigate('Homepage'); signOut(auth)}}>
                    <Text>Changer de compte</Text>
                </TouchableOpacity>
                </View>
            </View>  

            </KeyboardAwareScrollView> 
        </View>
    )
}



const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        flex: 1
        },

    creerColocContainer:{
        backgroundColor: '#172ACE',
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: windowHeight / 2 ,
        marginBottom: 25,

        //ombre
        elevation:5,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,

        //alignement
        alignItems: 'center',
        justifyContent: 'center'
    },

    rejoindreColocContainer:{
        //width et height
        width:'100%',

        //margin et padding
        marginBottom:15,
        marginTop:15,
        paddingTop:30,
        paddingBottom:30,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:15,

        //alignement
        justifyContent:'center',
        alignItems:'center',
    },

    inputBlanc: {
        height: 44,
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        width: '100%'  
    },
    
    inputGris: {
        height: 44,
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#E8E8E8',
        width: '100%'
    },

    texteBlanc:{
        color:'white',
        fontSize:22
    },

    texteNoir:{
        color:'black',
        fontSize:22
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
        marginBottom:50,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#EDF0FA',
        width: 154,
        justifyContent: 'center',
        alignItems:'center',
        //ombre
        elevation:2,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }

})
export default NoColocScreen;

