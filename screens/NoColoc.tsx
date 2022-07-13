import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import TopBackNavigation from '../components/TopBackNavigation'
import * as Haptics from 'expo-haptics';
import { KeyboardAwareScrollView } from 'react-native-ui-lib';


const NoColocScreen = ()  => {
    const [nomColoc, onChangeNom] = React.useState(null);
    const [codeColoc, onChangeCode] = React.useState(null);
    
    return(

        <KeyboardAwareScrollView>
        
        <View style={styles.container}>
            <SafeAreaView>
                <TopBackNavigation/>
            </SafeAreaView>
            
            
            <View style={styles.creerColocContainer}>
                <Text style={styles.texteBlanc}>Créer une coloc</Text>
                <TextInput
                style={styles.inputBlanc}
                onChangeText={onChangeNom}
                value={nomColoc}
                placeholder="Choisir un nom pour la coloc"
                placeholderTextColor='lightgrey'
                />
                <View style={styles.ButtonBlanc}>
                    <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}}>
                    <Text style={styles.texteCreer}>Créer</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.rejoindreColocContainer}>
                <Text style={styles.texteNoir}>Rejoindre une coloc</Text>
                <TextInput
                style={styles.inputGris}
                onChangeText={onChangeCode}
                value={codeColoc}
                placeholder="Entre un code de coloc"
                placeholderTextColor='gray'
                />
                <View style={styles.ButtonBleu}>
                    <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}}>
                    <Text style={styles.texteRejoindre}>Rejoindre</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'#EDF0FA',
        flexDirection:'column',
        padding:25
        },
    creerColocContainer:{
        paddingTop:30,
        paddingBottom:30,
        marginBottom:15,
        marginTop:15,
        backgroundColor:'#172ACE',
        flex:0.5,
        borderRadius:15,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        elevation:5,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    rejoindreColocContainer:{
        marginBottom:15,
        marginTop:15,
        paddingTop:30,
        paddingBottom:30,
        backgroundColor:'white',
        flex:0.5,
        borderRadius:15,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        elevation:2,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    inputBlanc: {
        height: 44,
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    inputGris: {
        height: 44,
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#E8E8E8'
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
    }

})
export default NoColocScreen;

