import React, { useEffect, useState } from 'react'
import {Button, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase-config'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';


const HomePageScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
    
    return(
        <View style={styles.container}> 
            <StatusBar barStyle="light-content" />  
            <View style={styles.bluebg}>
                <Text style={styles.title}>Bienvenue sur Hestia</Text>
                <Text style={styles.subTitle}>Mieux vivre ensemble</Text>
            </View>

            <View style={styles.Allbutton}>

                    <TouchableOpacity
                        onPress={() => {navigation.navigate("Login")}} 
                        style = {styles.SignUp}>
                            <Text style = {styles.TextSignUp}>Se connecter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {navigation.navigate("Signup")}} 
                        style = {styles.SignIn}
                        >
                            <Text style = {styles.TextSignIn}>S'inscrire</Text>
                    </TouchableOpacity>
                
                </View>         
        </View>
    )
}

export default HomePageScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },

    bluebg: {
        width: 'auto',
        backgroundColor: '#172ACE',
        flex: .75,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    
    title: {
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 300,
        fontSize: 29,
    },

    Allbutton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        
    },
    
    SignUp:{
        width: '45%',
        padding: 15,
        borderRadius: 10,
        alignItems:'center',
        marginTop: 25,
        borderColor: '#172ACE',
        borderWidth: 2,
    },

    SignIn:{
        backgroundColor:'#0f3fdb',
        width: '45%',
        padding: 15,
        borderRadius: 10,
        alignItems:'center',
        marginTop: 25,
        color: 'white',
        borderColor: '#172ACE',
        borderWidth: 2
    },

    TextSignIn: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextSignUp: {
        color: '#172ACE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    subTitle: {
        color: 'white',
        textAlign: 'center'
    }

})