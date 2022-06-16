import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../Icons/Settings.svg';
import {auth, db} from '../firebase-config'
import{useAuthState} from 'react-firebase-hooks/auth'
import { UserProps } from 'victory-core';
import{doc, getDoc} from 'firebase/firestore';
const ProfilImage=require('../Img/avatarHeader.png');


const Top = (props) => {
    // const [username, setUsername] = useState("")
    // useEffect( ()=> {
    //     const getUsername = async () => {
    //       const data = await getDoc(doc(db, "Users", auth.currentUser.uid));
    //       setUsername(data.data().nom)
    //     }
    //     getUsername();
    // }, [])
    return (
    
    <SafeAreaView>
    <View style={styles.Header}>
        <ImageContainer image={ProfilImage} />
        <View style={styles.Title}>
        <Text style={styles.BigTitle}>Hi, {props.nom}</Text>
        <Text style={styles.SmallTitle}>8 juin, 2022</Text>
        </View>
        <Settings width={25} height={25}  fill='#282828'/>
    </View>
    </SafeAreaView>
    );
};


export default Top;


const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
);


const HeaderTitle = () => (
    <View style={styles.Title}>
        <Text style={styles.BigTitle}>Hi, Paul</Text>
        <Text style={styles.SmallTitle}>8 juin, 2022</Text>
    </View>
);

const styles = StyleSheet.create ({
    Header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
    },
    Title: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        flex: 1,
    },
    BigTitle: {
        fontSize: 16
    },
    SmallTitle: {
        fontSize: 12,
        opacity: 0.6,
    },
    ImageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 7,
    },
    Image: {
        height: '100%',
        width: '100%',
    },
})