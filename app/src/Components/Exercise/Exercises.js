import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExercise } from '../../Store/Exercise/Actions';
import PropTypes from 'prop-types';
import Exercise from './Exercise';

class Exercises extends Component {

  static get propTypes() {
    return {
        exercises: PropTypes.array
    };
}

constructor(props) {
    super(props);
}

  render() {
    let exercises = this.props.exercises || [];
    return(
      <div className = "row">
        {exercises.map( exercise => <Exercise exercise={exercise.exercises} key={exercise.exerciseId}/>)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
  };
};


export default connect(mapStateToProps)(Exercises);
