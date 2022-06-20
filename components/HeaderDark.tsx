import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../Icons/Settings.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



const ProfilImage=require('../Img/avatarHeader.png');


const Top = ({}) => {
    
    const navigation =
    useNavigation<StackNavigationProp<RootStackParams>>();

    return (
    
    <SafeAreaView style= {{backgroundColor: '#EDF0FA', paddingBottom:Platform.OS === 'android' ? 25:0}}>
    <View style={styles.Header}>
    <TouchableOpacity onPress={() => navigation.push('Settings')}>
        <ImageContainer image={ProfilImage} />
    </TouchableOpacity>
    <HeaderTitle/>
    
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