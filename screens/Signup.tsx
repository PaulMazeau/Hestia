import React, { useEffect, useState } from 'react'
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase-config'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';
import {setDoc, doc} from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';

const SignupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const[pwdConf, setPwdConf] = useState("");
    const handleSignup = () => {
        if(username==""){
            alert("Rentre un nom d'utilisateur !");
            return
        }
        if(!(pwdConf === password)){
            alert("Les mots de passes doivent être identique !");
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
    
    return(
        <KeyboardAvoidingView style={styles.container} behavior = "padding">
            <View style = {styles.inputContainer}>
            <TextInput placeholder="Username"
                value={username}
                onChangeText = {text => setUsername(text)} 
                style = {styles.input}
                />


                <TextInput placeholder="email"
                value={email}
                onChangeText = {text => setEmail(text)} 
                style = {styles.input}/>
                
                <TextInput placeholder="password"
                value={password}
                onChangeText = {text => setPassword(text)} 
                style = {styles.input}
                secureTextEntry/>

                <TextInput placeholder="password confirmation"
                value={pwdConf}
                onChangeText = {text => setPwdConf(text)} 
                style = {styles.input}
                secureTextEntry/>
                
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignup}
                    style = {styles.button}>
                        <Text style = {styles.buttonText}>Créer mon compte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate("Login")}}
                    style = {[styles.button, styles.buttonOutline]}>
                        <Text style = {styles.buttonOutlineText}>Déjà membre ?</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer:{
        width:'80%',
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:10,
    },
    buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 40,
    },
    button:{
        backgroundColor:'#0f3fdb',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center',
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#0f3fdb',
        borderWidth:2,
    },
    buttonOutlineText:{
        color:'#0f3fdb',
        fontWeight:'700',
        fontSize:16,
    }
    

})