import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Set extends Component {

  static get propTypes() {
    return {
        set: PropTypes.object,
        updateSet: PropTypes.func,
        deleteSet: PropTypes.func
    };
  };

  constructor(props) {
      super(props);

      this.state = {
        set: props.set
      }
  }

  updateSet = (newValue, attributeToChange) => {
    let set = {...this.state.set, [attributeToChange]: newValue};
    this.setState({...this.state, set});
  }

  deleteSet = () => {
    let exerciseId = this.props.set.exerciseId;
    let setId = this.props.set.setId;
    this.props.deleteSet(exerciseId, setId);
  }

  render() {
    let set = this.state.set;
    const NAME = "name";
    const MIN_REPS = "minReps";
    const MAX_REPS = "maxReps";

    return (
        <div className="row">
            <input className="col s5" type="text" value={set.name} onChange={ (e) => this.updateSet(e.target.value, NAME) } placeholder="Name"></input>
            <input className="col s3" type="number" value={set.minReps} onChange={ (e) => this.updateSet(e.target.value, MIN_REPS) } ></input>
            <input className="col s3" type="number" value={set.maxReps} onChange={ (e) => this.updateSet(e.target.value, MAX_REPS) } ></input>
            <span className="col s1" onClick={() => this.deleteSet()} >X</span>
        </div>
    );
  }
}

export default (Set);