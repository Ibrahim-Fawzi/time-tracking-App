import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import ToggelableTimerForm from './components/ToggelableTimerForm';
import EditableTimer from './components/EditableTimer';
import { v4 as uuidv4 } from "uuid";
import { newTimer } from './utils/TimerUtils';
export default class App extends React.Component {
  state = {
    timers: [
      {
        title: "lawmvvhdb cbdf",
        project: "cbs sjdabjsd",
        id: uuidv4(),
        elapsed: "686",
        isRunning: true,
      },
      {
        title: "cv cnmsdfbk",
        project: "adasd hdbeh",
        id: uuidv4(),
        elapsed: "9893",
        isRunning: false,
      },
    ],
  };
  handleCreatFormSubmit = timer => {
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers],
    });
  };
    handleFormSubmit = attrs => {
      const { timers } = this.state;
      this.setState({
        timers: timers.map( timer => {
          if (timer.id == attrs.id) {
            const { title, project } = attrs;
            return {
              ...timer,
              title,
              project,
            };
          }
          return timer;
        }

        ),
      });
    };
    componentDidMount() {
      const TM_INT= 1000;
      this.intervalId = setInterval (() => {
        const {timers} = this.state;
        this.setState({
          timers: timers.map(timer=> {
            const {elapsed, isRunning} = timer;
            return {
              ...timer,
              elapsed: isRunning ? elapsed + TM_INT : elapsed,
            };
          }),
        });
      }, TM_INT);
    }
      componentWillUnmount() {
        clearInterval(this.intervalId);
      }
           
    
    handleRemovePress = timerId => {
      
      this.setState({
        timers: this.state.timers.filter(l => l.id !== timerId),
        }

        );
      };
    toggelTimer = timerId => {
      this.setState(prevState => {
        const {timers} = prevState;
        return {
          timers: timers.map(timer => {
            const {id, isRunning} =timer;
            if (id === timerId) {
              return {
                ...timer,
                isRunning: !isRunning,
              };
            }
            return timer;
            
          }),
        };
      });
    };
  
  render() {
    const {timers} = this.state;
  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Timers</Text>
      </View>
      <KeyboardAvoidingView style={styles.timerListContainer} behavior="padding">
      <ScrollView style={styles.timerList}>
        <ToggelableTimerForm onFormSubmit={this.handleCreatFormSubmit} />
        {timers.map(({title, project, id, elapsed, isRunning}) => (
        <EditableTimer
        key={id}
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onFormSubmit={this.handleFormSubmit}
        onRemovePress={this.handleRemovePress}
        onStartPress={this.toggelTimer}
        onStopPress={this.toggelTimer}
        />
        ))}
      </ScrollView>
      </KeyboardAvoidingView>
     </View>
  );
}
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom:15,
  },
  timerListContainer: {
    flex: 1,
  },
});
