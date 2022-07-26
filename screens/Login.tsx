import React, { useState } from 'react'
import {Dimensions, ImageBackground, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase-config'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import { useHeaderHeight } from '@react-navigation/elements';
import{useToast} from'react-native-toast-notifications';

const image = require('../Img/homepage_bg.png');
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    const toast = useToast();
    const [modalMail, setModalmail] = useState("");
    const handleLogin = () => {
        if(!(regexExp.test(email))){
            toast.show('Rentre un email valide!', {
                type: "danger"});
            return;
        }
        if(password.length<6){
            toast.show('Le mot de passe doit faire \nplus de 6 caractères!', {
                type: "danger"});
            return;
        }
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
            switch(error.code){
                case 'auth/user-not-found': toast.show("Ce compte n'existe pas !", {
                    type: "danger"}); return;
                break;
                case 'auth/wrong-password': toast.show("Combinaison email/mot de passe invalide", {
                    type: "danger"}); return;
                default:
                    toast.show("Erreur lors de la connexion", {
                        type: "danger"}); return; 
                break;
            }
        }).then((d) => {if(d){navigation.navigate('NoColoc')}})
        ; //ou on pourrait get la data de luser et update le context mais c ok 
    }
    
    const headerHeight = useHeaderHeight();
    const handlePasswordReset = () => {
        if(!(regexExp.test(modalMail))){
            toast.show('Rentre un email valide!', {
                type: "danger"});
            return;
        }
        sendPasswordResetEmail(auth, modalMail).then(() => toast.show("Regarde tes mails pour réinitialiser ton mot de passe !")).catch(() => {
            toast.show("Erreur lors de ta demande!")
        });
        setModalVisible(false)
    }

    return(
        <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight -220}
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={image} resizeMode="cover" style={styles.bluebg} imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>

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

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.mdpOublie}>Mot de passe oublié?</Text>
                    </TouchableOpacity>
                    <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
            >
                <View style={styles.PopUpCentre}>
          <View style={styles.modalView}>
                <Text>Tape ton mdp fdp</Text>
                <TextInput onChangeText={(event) => setModalmail(event)} value={modalMail} placeholder="email a taper ici"/>
                <TouchableOpacity onPress={() => handlePasswordReset()}><Text>Envoier un email pr reset le pwd</Text></TouchableOpacity>
                </View>
                </View>
            </Modal>
            </ImageBackground>

            
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
        height: windowHeight / 2 ,
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

      mdpOublie:{
          color: 'white',
          textDecorationLine: 'underline',
          fontWeight: '500',
          fontSize: 14,
          paddingLeft: 10
      },
      PopUpCentre: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:'rgba(0,0,0,0.2)'
      },
    
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
       
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})