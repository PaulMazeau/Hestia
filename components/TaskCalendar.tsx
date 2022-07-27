import { SHEET_STATE } from '@gorhom/bottom-sheet';
import moment from 'moment';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

let datesWhitelist = [{
    start: moment(),
    end: moment().add(10, 'y')  // total 4 days enabled
  }];

// let fetchedDates = ["08/07/2022"];
// // let markedDatesArray = [];

// for (let i = 0; i < fetchedDates.length; i++) {
//     markedDatesArray.push({
//       date: moment(`${fetchedDates[i]}`, "DD/MM/YYYY"),
//       dots: [
//         {
//           color: 'red',
//         },
//       ],
//     });
//   }

//props est les dates ou luser a une tahce
const TaskCalendar = (props) => {
  const [markedDates, setMarkedDates] = useState([]);
  const markedDatesArray = () => {
    var res = []
    if(props.userDates.length > 0){
      for(var i=0; i< props.userDates.length; i++){
        res.push({
          date : moment(props.userDates[i].toDate().toLocaleDateString('en-US'), "MM/DD/YYYY"),
          dots: [
            {
              color: 'red',
            },
          ],
        });
      }
    }
    return res;
  }

  return(
  <View>
    <CalendarStrip
      scrollerPaging={true}
      scrollable={true}
      style={styles.Calendar}
      calendarColor={'#EDF0FA'}
      calendarHeaderStyle={{color: 'black'}}
      dateNumberStyle={{color: 'black'}}
      dateNameStyle={{color: 'black'}}
      iconContainer={{flex: 0.1}}
      showMonth={false}
      markedDates={markedDatesArray()}
      datesWhitelist={datesWhitelist}
    />
  </View>

)};

const styles = StyleSheet.create({ 

    Calendar: {
        height: 80,
        margin: 0,
        marginLeft: 16,
      marginRight: 16
    }

});

export default TaskCalendar;