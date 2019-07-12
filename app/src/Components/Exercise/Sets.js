import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Set from './Set';

export default class Sets extends Component {

  static get propTypes() {
    return {
        sets: PropTypes.array
    };
}

constructor(props) {
    super(props);
}
  render() {
      let sets = this.props.sets;
    return sets ? (
        <div id="container">
          <div className="row">
            <div className="col s5">Name</div>
            <div className="col s3">Minimum Planned Reps</div>
            <div className="col s3">Maximum Planned Reps</div>
          </div>
          {sets ? sets.map(set => <Set set={set} key={set.setId}/>) : ""}
        </div>
    ) : "";
  }
};