import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../Icons/Settings.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



const ProfilImage=require('../Img/avatarHeader.png');
//props est nom du frero + nom dla coloc + lurl de son avatar

const Top = (props) => {
    
    const navigation =
    useNavigation<StackNavigationProp<RootStackParams>>();

    return (
    
    <SafeAreaView style= {{backgroundColor: '#EDF0FA', paddingBottom:Platform.OS === 'android' ? 25:0}}>
    <View style={styles.Header}>
    <TouchableOpacity onPress={() => navigation.push('Settings')}>
    <View style={styles.ImageContainer}>
        <Image source={{uri: props.avatar}} style={styles.Image}/>
    </View>
    </TouchableOpacity>
    <View style={styles.Title}>
        <Text style={styles.BigTitle}>Hi, {props.name}</Text>
        <Text style={styles.SmallTitle}>{props.clcName}</Text>
    </View>
    <TouchableOpacity  onPress={() => navigation.push('ColocSettings')}>
        <Settings width={25} height={25} fill="#282828"/>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
    );
};


export default Top;


// const ImageContainer = ({image}) => (
//     <View style={styles.ImageContainer}>
//         <Image source={image} style={styles.Image}/>
//     </View>
// );




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