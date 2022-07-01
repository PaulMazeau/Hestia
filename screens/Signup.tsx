import React, { useState } from 'react'
import {KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Image} from 'react-native'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase-config'
import { useNavigation } from '@react-navigation/native';
import {setDoc, doc} from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import { useHeaderHeight } from '@react-navigation/elements';

const SignupScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const handleSignup = () => {
        if(username==""){
            alert("Rentre un nom d'utilisateur !");
            return
        }
        createUserWithEmailAndPassword(auth, email, password).then(function(userCred) {
            // get user data from the auth trigger
            const userUid = userCred.user.uid; // The UID of the user.
            // set account  doc  
            const entry = {
                nom: username,
                uuid: userUid,
              solde: 0,
              tache: "Rien de prévu!"
            }
           setDoc(doc(db, 'Users', userUid),entry); 
          }).catch(error => alert(error.message));
        
    }
    
    const headerHeight = useHeaderHeight();
    return(
        <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight -260}
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.bluebg}>

                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate("Login")}} >
                            <Text style = {styles.DejaMembre}>Se connecter</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                <View style = {styles.Title}>
                    <TopBackNavigationClear/>
                    <Text style={styles.screenTitle}>S'inscrire</Text>
                </View>
                <View style = {styles.inputContainer}>
                    <TextInput placeholder="Nom d'utilisateur"
                    value={username}
                    onChangeText = {text => setUsername(text)} 
                    style = {styles.input}
                    placeholderTextColor="rgba(255, 255, 255, 0.8)"
                    autoCapitalize='none'
                    autoCorrect={false}
                    />

                    <TextInput placeholder="Adresse Email"
                    value={email}
                    onChangeText = {text => setEmail(text)} 
                    style = {styles.input}
                    placeholderTextColor="rgba(255, 255, 255, 0.8)"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    autoCorrect={false}
                    />
                    
                    <TextInput placeholder="Mot de passe"
                    value={password}
                    onChangeText = {text => setPassword(text)} 
                    style = {styles.input}
                    secureTextEntry
                    placeholderTextColor="rgba(255, 255, 255, 0.8)"
                    autoCapitalize='none'
                    />

                    
                    
                </View>
            </View>
            
                <TouchableOpacity
                    onPress={handleSignup}
                    style = {styles.buttonSuivant}>
                        <Text style = {styles.buttonText}>Suivant</Text>
                </TouchableOpacity>
                              
    </View>
    </KeyboardAvoidingView>
    )
}

const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
);

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },

    inputContainer:{
        width:'100%',
        marginTop: '10%'
    },
    
    input:{
        backgroundColor:'#172ACE',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius:10,
        marginTop:10,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        fontSize: 19,
        fontWeight: '600',
        color: 'white',
        marginBottom: 15,
    },

    buttonSuivant:{
        backgroundColor:'#0f3fdb',
        width: '85%',
        padding: 15,
        borderRadius: 10,
        alignItems:'center',
        marginTop: 25,
        marginLeft: '7.5%',
        marginRight: '7.5%',
    },

    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },

    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
      },

    bluebg: {
        width: 'auto',
        backgroundColor: '#172ACE',
        flex: .6,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    DejaMembre: {
        color: 'white',
        textAlign: 'right',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10
    },

    Title: {
        flexDirection : 'row', 
        alignItems: 'center',
        marginTop: '10%'
      },

      ImageContainer: {
        height: 25,
        width: 25,
        overflow: 'hidden',
        borderRadius: 7,
    },
    
    Image: {
            height: '100%',
            width: '100%',
            
        },

        buttonGoogle:{
            backgroundColor:'#0f3fdb',
            width: '85%',
            padding: 15,
            borderRadius: 10,
            marginTop: 25,
            marginLeft: '7.5%',
            marginRight: '7.5%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            
           
        },

        TextGoogle: {
        color:'white',
        fontWeight:'700',
        fontSize:16,
        marginLeft: 10
        }

})

