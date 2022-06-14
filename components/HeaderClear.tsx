import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../Icons/Settings.svg';
import {useNavigation} from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../AppTabNavigator';



const ProfilImage=require('../Img/avatarHeader.png');


const Top = () => {
    const navigation =
      useNavigation<StackNavigationProp<RootStackParams>>();
    return (
    
    <SafeAreaView>
    <View style={styles.Header}>
    <ImageContainer image={ProfilImage} />
    <HeaderTitle/>
    <Settings width={25} height={25} fill="white" onPress={() => navigation.navigate('Settings')}/>
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
        fontSize: 16,
        color: 'white',
    },
    SmallTitle: {
        fontSize: 12,
        opacity: 0.6,
        color: 'white'
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