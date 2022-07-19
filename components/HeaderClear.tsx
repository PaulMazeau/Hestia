import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../Icons/Settings.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/native';

//props est name du frérot + de la coloc
const Top = (props) => {
    
    const navigation =
    useNavigation<StackNavigationProp<RootStackParams>>();
    
    
    return (
    
    <SafeAreaView style= {{backgroundColor: '#172ACE', paddingBottom:Platform.OS === 'android' ? 25:0}}>
    <View style={styles.Header}>
    <TouchableOpacity onPress={() => navigation.push('Settings')}>
    <View style={styles.ImageContainer}>
        <Image source={{uri: props.avatar,
        cache: 'force-cache'}} style={styles.Image}/>
    </View>
    </TouchableOpacity>
    <View style={styles.Title}>
        <Text style={styles.BigTitle}>Hi, {props.name}</Text>
        <Text style={styles.SmallTitle}>{props.clcName}</Text>
    </View>
    <TouchableOpacity  onPress={() => navigation.push('ColocSettings')}>
        <Settings width={25} height={25} fill="white"/>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
    );
};


export default Top;


// const ImageContainer = ({image}) => (
//     <View style={styles.ImageContainer}>
//         <Image source={{uri: image}} style={styles.Image}/>
//     </View>
// );




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