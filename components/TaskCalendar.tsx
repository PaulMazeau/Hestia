import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

let datesWhitelist = [{
    start: moment(),
    end: moment().add(10, 'y')  // total 4 days enabled
  }];

let fetchedDates = ["2022-06-15", "2022-06-17", "2022-06-22", "2022-06-27"];
let markedDatesArray = [];

for (let i = 0; i < fetchedDates.length; i++) {
    markedDatesArray.push({
      date: moment(`${fetchedDates[i]}`, "YYYY-MM-DD"),
      dots: [
        {
          color: 'red',
        },
      ],
    });
  }


const TaskCalendar = () => (

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
      markedDates={markedDatesArray}
      datesWhitelist={datesWhitelist}
    />
  </View>

);

const styles = StyleSheet.create({ 

    Calendar: {
        height: 80,
        margin: 0
    }

});

export default TaskCalendar;