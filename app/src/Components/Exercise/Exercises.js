import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExercise } from '../../Store/Exercise/Actions';
import PropTypes from 'prop-types';
import Exercise from './Exercise';

export default class Exercises extends Component {

  static get propTypes() {
    return {
        exercises: PropTypes.array
    };
}

constructor(props) {
    super(props);
}

  render() {
    let exercises = this.props.exercises;
    return(
      <div className = "row">
        {exercises ? exercises.map( exercise => <Exercise exercise={exercise} key={exercise.exerciseId}/>) : ""}
      </div>
    );
  }
};
