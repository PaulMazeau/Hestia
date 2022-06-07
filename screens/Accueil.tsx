import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CourseCard from '../components/CourseCard';
import { RootStackParams } from '../App';


type Props = NativeStackScreenProps<RootStackParams, 'AccueilStack'>;

const AccueilScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.screenTitle}>Accueil</Text>
        
            <Text style={styles.sectionTitle}>Qui est présent à la coloc?</Text>
            <CourseCard name="Tom" onPress= {() =>{navigation.push("Course", { name: "Sushi"})}}/>
            <CourseCard name="Paul" onPress= {() =>{navigation.push("Course", { name: "Burger"})}}/>
            <CourseCard name="Toto" onPress= {() =>{navigation.push("Course", { name: "Tacos "})}}/>

            <Text style={styles.sectionTitle}>Derniere Tâche à faire</Text>
            <CourseCard name="Menage" onPress= {() =>{navigation.push("Course", { name: "Menage"})}}/>
            <CourseCard name="Prout" onPress= {() =>{navigation.push("Course", { name: "Prout "})}}/>
            <CourseCard name="Caca" onPress= {() =>{navigation.push("Course", { name: "Caca "})}}/>
        
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 24,
    },
    CourseCard: {
        backgroundColor: '#efefef',
    }, 
    sectionTitle: {
        fontSize: 16,
        marginTop: 16,
    },
    screenTitle: {
        fontSize: 24,
        marginTop: 8,
        fontWeight: 'bold',
    }
})



export default AccueilScreen;