import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Exercise from './Exercise';

class Creation extends Component {

  static get propTypes() {
    return {
        topLevelExercise: PropTypes.object
    };
}
  render() {
    return(
      <div className = "row">
        <Exercise exercise={this.props.topLevelExercise}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    topLevelExercise : state.exercise.topLevelExercise
  };
};


export default connect(mapStateToProps)(Creation);
