import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Menu from '../components/Menu';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RestaurantCard from '../components/RestaurantCard';
import { RootStackParams } from '../App';


type Props = NativeStackScreenProps<RootStackParams, 'ExploreStack'>;

const ExploreScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.screenTitle}>Restaurants</Text>
        <View>
            <Text style={styles.sectionTitle}>Restaurants Near You</Text>
            <RestaurantCard name="Sushi restaurants" onPress= {() =>{navigation.push("Restaurant", { name: "Sushi restaurant"})}}/>
            <RestaurantCard name="Burger restaurants" onPress= {() =>{navigation.push("Restaurant", { name: "Burger restaurant"})}}/>
            <RestaurantCard name="Tacos restaurants" onPress= {() =>{navigation.push("Restaurant", { name: "Tacos restaurant"})}}/>

            <Text style={styles.sectionTitle}>Popular Restaurant</Text>
            <RestaurantCard name="Italien restaurants" onPress= {() =>{navigation.push("Restaurant", { name: "Italieb restaurant"})}}/>
            <RestaurantCard name="Prout restaurants" onPress= {() =>{navigation.push("Restaurant", { name: "Prout restaurant"})}}/>
            <RestaurantCard name="Caca restaurants" onPress= {() =>{navigation.push("Restaurant", { name: "Caca restaurant"})}}/>
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 24,
    },
    restaurantCard: {
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



export default ExploreScreen;