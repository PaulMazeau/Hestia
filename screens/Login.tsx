import React, { useEffect, useState } from 'react'
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase-config'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password).catch(error => alert(error.message));
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).catch(error => alert(error.message))
    }
    
    return(
        <KeyboardAvoidingView style={styles.container} behavior = "padding">
            <View style = {styles.inputContainer}>
                <TextInput placeholder="email"
                value={email}
                onChangeText = {text => setEmail(text)} 
                style = {styles.input}/>
                
                <TextInput placeholder="password"
                value={password}
                onChangeText = {text => setPassword(text)} 
                style = {styles.input}
                secureTextEntry/>
            </View>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style = {styles.button}>
                        <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignup}
                    style = {[styles.button, styles.buttonOutline]}>
                        <Text style = {styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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