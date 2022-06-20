import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageComponent, Image, ListRenderItem, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { FlatList, ScrollView, Switch } from 'react-native-gesture-handler';
import { RootStackParams } from '../App';
import Top from '../components/HeaderSettings';
import Fleche from '../Icons/fleche.svg';
import Addbutton from '../Icons/AddButton.svg';
import Exit from '../Icons/Exit.svg';

import TopBackNavigation from '../components/TopBackNavigation';
import { BorderRadiuses } from 'react-native-ui-lib';


type Props = NativeStackScreenProps<RootStackParams, 'ColocSettings'>;
const ProfilImage=require('../Img/avatarHeader.png');


const data : Image[] = [
    require('../Img/avatar1.png'),
    require('../Img/avatar2.png'),
    require('../Img/avatar3.png'),
    require('../Img/test1.png'),
    require('../Img/test2.png')
];



const ColocSettings = ({route, navigation}: Props) => {
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    
  return (
    <View style={styles.Body}>
        <Top/>
        <View style={styles.container}>
        <View style={styles.Title}>
          <TopBackNavigation/>
          <Text style={styles.screenTitle}>Paramètre de la colocation</Text>
        </View>
        <View style={styles.containerColoc}>
            <FlatList 
                data={data} 
                renderItem={renderItem} 
                numColumns={3}   
                columnWrapperStyle={{justifyContent:'space-evenly', paddingTop: 20, paddingBottom: 20,}}
            ></FlatList>
        </View>
        <View style={styles.addButton}>
        <TouchableOpacity onPress={() => console.log("blabla")}>
            <Addbutton/>
        </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => console.log("blabla")}>
            <View style={styles.Setting}>
                <Text style={styles.name}>Thème sombre</Text>
                <Switch onValueChange={toggleSwitch} value={isEnabled}></Switch>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("blabla")}>
            <View style={styles.Quitter}>
                <Exit></Exit>
                <Text style={{fontWeight: '700', color:'white'}}>Quitter la colocation</Text>
            </View>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const renderItem : ListRenderItem<any> = ({item}) => {
    return (
        <ImageContainer image={item}></ImageContainer>
        );
};

//importer l'image de maison
const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
  );

const styles = StyleSheet.create({
    Body:{
      flex: 1,
      backgroundColor: '#EDF0FA',
    },
    addButton:{
        borderRadius:100,
        flexDirection:'row', 
        justifyContent:"center",
        top:-30,
        
    },
    container: {
        paddingBottom: 16,
        
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#EDF0FA',
        height: '100%',
        flexDirection : 'column',
        
    },
    containerColoc: {
        height: 'auto',
        backgroundColor: 'blue',
        borderRadius: 20,
        paddingBottom: 20
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    name:{
        fontWeight: '700'
    },
    Setting: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginBottom: 20,
    },
    Quitter:{
        backgroundColor: "#CE1717",
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginBottom: 20,   
    },
    ImageContainer: {
        height: 60,
        width: 60,
        borderRadius:100,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'flex-end',
    },
    Image: {
        height: '100%',
        width: '100%',
        
        
        
    },
    Title: {
        flexDirection : 'row', 
        marginTop : 10,
        marginBottom : 10,
    },
})

export default ColocSettings;