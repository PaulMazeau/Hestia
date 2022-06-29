import React, { useEffect, useState } from 'react'
import {KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase-config'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';
import {setDoc, doc} from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import { useHeaderHeight } from '@react-navigation/elements';

const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password).then(function(userCred) {
            // get user data from the auth trigger
            const userUid = userCred.user.uid; // The UID of the user.
            const email = userCred.user.email; // The email of the user..
            // set account  doc  
            const membre = {
                uuid: userUid,
              solde: 0
            }
           setDoc(doc(db, 'Users', userUid),membre); 
          }).catch(error => alert(error.message));
        
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).catch(error => alert(error.message))
    }
    
    const headerHeight = useHeaderHeight();
    return(
        <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight -220}
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.bluebg}>

                <SafeAreaView>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate("Signup")}} >
                            <Text style = {styles.PasdeCompte}>S'inscrire</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                <View style = {styles.Title}>
                    <TopBackNavigationClear/>
                    <Text style={styles.screenTitle}>Se Connecter</Text>
                </View>
                    <View style = {styles.inputContainer}>
                        <TextInput placeholder="Adresse Email"
                        value={email}
                        onChangeText = {text => setEmail(text)} 
                        style = {styles.input}
                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                        autoCapitalize='none'
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
                    onPress={handleLogin}
                    style = {styles.Seconnecter}>
                        <Text style = {styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
          
        </View>  
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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

    PasdeCompte: {
        color: 'white',
        textAlign: 'right',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10
    },
    
    Seconnecter:{
        backgroundColor:'#0f3fdb',
        width: '85%',
        padding: 15,
        borderRadius: 10,
        alignItems:'center',
        marginTop: 25,
        marginLeft: '7.5%',
        marginRight: '7.5%',
    },

    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },

      Title: {
        flexDirection : 'row', 
        alignItems: 'center',
        marginTop: '10%'
      },
})