import React from 'react';
import TimerForm from './TimerForm';
import PropTypes from 'prop-types';
//import { PropTypes } from 'react-native';
import Timer from './Timer';
export default class EditableTimer extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        project: PropTypes.string.isRequired,
        elapsed: PropTypes.number.isRequired,
        isRunning: PropTypes.bool.isRequired,
        onRemovePress: PropTypes.func.isRequired,
        onStartPress: PropTypes.func.isRequired,
        onStopPress: PropTypes.func.isRequired,
    };
   state = { 
    editFormOpen: false,
   };
   handleEditPress = () => {
    this.setState({editFormOpen: true});
   };
   handleEditFormClose = () => {
    this.setState({editFormOpen: false});
   }; 
   handleEditFormSubmit = timer => {
    const {onFormSubmit} = this.props;
    onFormSubmit(timer);
    this.setState({editFormOpen : false});
   };
  
   render() {
   const { id,
    title,
    project,
    elapsed,
    isRunning, onRemovePress, onStartPress, onStopPress, } = this.props;
    const {editFormOpen} = this.state;
 
    if (editFormOpen) {
        return < TimerForm id={id} title={title} project={project} elapsed={elapsed} editFormOpen={editFormOpen} 
        onFormSubmit={this.handleEditFormSubmit} onFormClose={this.handleEditFormClose}/>
    }
    return (<Timer id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} 
        onEditPress={this.handleEditPress} onRemovePress={onRemovePress} 
        onStartPress={onStartPress} onStopPress={onStopPress}/>);

}
}