import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Menu from '../components/Menu';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import RestaurantCard from '../components/RestaurantCard';
import { RootStackParams } from '../App';


type Props = NativeStackScreenProps<RootStackParams, 'RestaurantsStack'>;

const RestaurantsScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.screenTitle}>Restaurants Screen</Text>
        <ScrollView>
            <RestaurantCard name="Sushi restaurants" onPress={name => navigation.navigate('Restaurant', {name})}/>
            <RestaurantCard name="Sushi restaurants" onPress={name => navigation.navigate('Restaurant', {name})}/>
            <RestaurantCard name="Sushi restaurants" onPress={name => navigation.navigate('Restaurant', {name})}/>
            <RestaurantCard name="Sushi restaurants" onPress={name => navigation.navigate('Restaurant', {name})}/>
            <RestaurantCard name="Sushi restaurants" onPress={name => navigation.navigate('Restaurant', {name})}/>
            <RestaurantCard name="Sushi restaurants" onPress={name => navigation.navigate('Restaurant', {name})}/>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 24,
    },
    screenTitle: {
        fontSize: 24,
        marginTop: 8,
        fontWeight: 'bold',
    }
})

export default RestaurantsScreen;