import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

//components


class App extends Component { //Functional component isn't aware of state and doesn't have to render or handle data flow
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.fetchBenefitList();
  }

  render() {
    return (  
      <div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    // benefitList: state.benefitList,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    // fetchBenefitList: actions.fetchBenefitList,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)