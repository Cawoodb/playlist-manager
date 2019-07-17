import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Exercise from './Exercise';

export default class Exercises extends Component {

  static get propTypes() {
    return {
        exercises: PropTypes.array
    };
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
