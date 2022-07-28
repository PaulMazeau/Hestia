import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Top from '../components/HeaderDark';
import { SegmentedControl, BorderRadiuses } from 'react-native-ui-lib';
import GlobalTask from '../components/GlobalTask';
import MesTask from '../components/MesTask';
import TaskCalendar from '../components/TaskCalendar';
import { getDoc, doc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { RootStackParams } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCollection } from 'react-firebase-hooks/firestore';
import { UserContext } from '../Context/userContextFile';
import * as Notifications from 'expo-notifications';

type Props = NativeStackScreenProps<RootStackParams, 'TacheStack'>;

 const TacheScreen = ({route, navigation}: Props) => {
  const [user, setUser] = useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [userList, setUserList] = useState([]);//pr récup la liste des users a passer dans la bs + la popup des tachescard

  const onChangeIndex = useCallback((index: number) => {
    setShow((r) => !r)
  }, []);
  useEffect( () => {
    const getUsers = async () => {
      const data = await getDoc(doc(db, "Colocs", user.colocID));
      const membersID = data.data().membersID;
      const q = query(collection(db, "Users"), where('uuid', 'in', membersID))
      const querySnapshot = await getDocs(q);
      setUserList(querySnapshot.docs.map((doc) => ({...doc.data()})));
    }
    getUsers();
  }, [])

  const [allTasks, loading, error] = useCollection(query(collection(db, "Colocs/"+user.colocID+ "/Taches"), orderBy('date')));
  //récupère les dates ou luser a une tache pr passer passer ds taskcalendar pr point rouge et permet de setup les notifs
  const fetchDates =  () => {
    const res = []
    if(!(allTasks === undefined)){
      if(allTasks.docs.length > 0){
        for(var i = 0; i < allTasks.docs.length; i++){
          const task = allTasks.docs[i].data()
          if(task.nextOne == auth.currentUser.uid){ //point rouge la ou luser est le next one + notif
            res.push(task.date)
            pushNotif(task, allTasks.docs[i].id)
   
          }
        }
      }
    }
    return res;
  }

  //push la notif associée à la task, dans une autre fonction car sinon les points rouges de taskcalendar ne marchent pas
  const pushNotif = async(task, id) => {
    const notifs = await Notifications.getAllScheduledNotificationsAsync();
    const notifsTacheID = notifs.map((n)=> n.content.data.tacheID);
    if(!(notifsTacheID.includes(id))){ //parametrage de la notif si luser est sur la next one
      const trigger = new Date (task.date.toDate().toString())
      trigger.setHours(Number(task.rappel.substr(0, 2)))
      trigger.setMinutes(Number(task.rappel.substr(3, 5)))
      const now = new Date(Date.now())
      if(trigger > now){
      await Notifications.scheduleNotificationAsync({
              content:{
                title:"Rappel de tache !",
                body:"Tu dois:" + " " + task.desc,
                data: {tacheID: id}
              },
              trigger,
            })}//TODO: update la notif lorsque la tache est update par luser... 
          }
  }




  return (

      <View style={styles.container}>

          <Top name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
              <Text style={styles.screenTitle}>Tâches à faire</Text>

                <TaskCalendar userDates = {fetchDates()}/> 
                
              <SegmentedControl 
              containerStyle={styles.control}
              segments={[{label: 'Tâches générales'}, {label: 'Mes tâches'}]}
              onChangeIndex={onChangeIndex}
              initialIndex={0}
              activeColor='black'
              borderRadius={BorderRadiuses.br20}
              backgroundColor='white'
              activeBackgroundColor='rgba(23,42,206,0.27)'
              inactiveColor='black'
              outlineColor= 'white'
              outlineWidth= {2}
              throttleTime= {100}
              />
              {show ? <GlobalTask tasks={allTasks} clcID = {user.colocID} userList = {userList}/> : <MesTask tasks = {allTasks} clcID={user.colocID}/> }

      </View>

  );
};

const styles = StyleSheet.create({

    container: {
      backgroundColor: '#EDF0FA',
      flex: 1,
    },

    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 16,
      marginRight: 16
    }, 

    control: {
      marginBottom: 15,
      marginLeft: 16,
      marginRight: 16
    },    
})

export default TacheScreen;

