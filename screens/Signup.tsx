import React, { useState } from 'react'
import {KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Dimensions, ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import { useHeaderHeight } from '@react-navigation/elements';
import{useToast} from'react-native-toast-notifications'
import { browserLocalPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
const image = require('../Img/homepage_bg.png');
const windowHeight = Dimensions.get('window').height;

const SignupScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const headerHeight = useHeaderHeight();
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    const toast = useToast();
    const checkDataBeforeNavigating = () => {
        if(!(regexExp.test(email))){
            toast.show('Rentre un email valide!');
            return;
        }
        if(password.length<6){
            toast.show('Le mot de passe doit faire plus de 6 caractères!');
            return;
        }
        if(username.length<3){
            toast.show("Le nom d'utilisateur doit faire plus de 3 caractères !")
        }
        signInWithEmailAndPassword(auth, email, "sexealexleboss").then((d) => {if(d){toast.show('sacré mot de passe...')}}).catch((err) => {
            switch(err.code){
                case 'auth/user-not-found': navigation.navigate('Avatar', {username: username, email: email, password: password}); return;
                break;
                case 'auth/wrong-password': toast.show("Ce compte existe déjà"); return; break;
                default: toast.show("Erreur lors de la création du compte"); return; break;
            }
        })
    }
    return(
        <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight -221}
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={image} resizeMode="cover" style={styles.bluebg} imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>

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
            </ImageBackground>
            
                <TouchableOpacity
                    onPress={() => checkDataBeforeNavigating()}
                    style = {styles.buttonSuivant}>
                        <Text style = {styles.buttonText}>Suivant</Text>
                </TouchableOpacity>
                              
    </View>
    </KeyboardAvoidingView>
    )
}

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
        height: windowHeight / 1.9 ,
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

        TextGoogle: {
        color:'white',
        fontWeight:'700',
        fontSize:16,
        marginLeft: 10
        }

})

