import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl, Spacings } from 'react-native-ui-lib';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';

const DepensePerso = () => {

  return (
 

<View style={styles.Body}>
<Top/>
<View style={styles.container}>

  <Text style={styles.screenTitle}>Toutes les dépenses</Text>

  <View>


<ScrollView showsVerticalScrollIndicator={false}>

  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>
  <Transaction/>

</ScrollView>



</View>

</View>
</View>

  );
};



const styles = StyleSheet.create({

DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10
  },
  
screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
},

container: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
},

Body:{
    flex: 1,
    backgroundColor: '#EDF0FA',
},

})

export default DepensePerso;