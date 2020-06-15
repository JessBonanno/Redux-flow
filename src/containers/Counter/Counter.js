import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actions from '../../store/actions';

class Counter extends Component {
  state = {
    counter: 0,
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case 'inc':
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case 'dec':
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case 'add':
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case 'sub':
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
    }
  };

  render() {
    return (
      <div>
        {/* using the store state and dispatch actions instead of local state */}
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label='Increment'
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label='Decrement'
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label='Add 10' clicked={this.props.onAddCounter} />
        <CounterControl
          label='Subtract 15'
          clicked={this.props.onSubtractCounter}
        />
        {/* hr element is a horizontal line separating elements on the screen */}
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
        <ul>
          {this.props.storedResults.map(r => (
            <li key={r.id} onClick={() => this.props.onDeleteResult(r.id)}>
              {r.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// get the state we want to use in this component from the store
const mapStateToProps = state => {
  return {
    ctr: state.counter.counter,
    storedResults: state.result.results,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actions.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actions.DECREMENT }),
    onAddCounter: () => dispatch({ type: actions.ADD, val: 10 }),
    onSubtractCounter: () => dispatch({ type: actions.SUBTRACT, val: 15 }),
    onStoreResult: result => dispatch({ type: actions.STORE_RESULT, result }),
    onDeleteResult: id => dispatch({ type: actions.DELETE_RESULT, id }),
  };
};

// connecting this component with the store state and dispatch actions we defined above to be used together
// ! if only dispatching and not using state you pass null as first param
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
