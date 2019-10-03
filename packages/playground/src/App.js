/*
  app: @playground
  App to create and test features, try to reproduce/eliminate
  bugs and easily check the local React Ape build.
*/

import React, {Component} from 'react';
import {render, Text, View, registerComponent} from '../../react-ape/reactApeEntry';

import Spinner from './Spinner';
import SmartRender from './SmartRender';

// Create Custom Components
const custom = {
  Spinner: registerComponent('Spinner', Spinner)
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, degrees: 0.0};
  }

  componentDidMount() {
    setInterval(() => {
      const { degrees } = this.state;
      this.setState({ degrees: degrees + 0.10 });
    }, 100);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    const { degrees } = this.state;
    if (this.state.errorInfo) {
      return errorInfo;
    }

    return (
      <View>
        <custom.Spinner degrees={degrees} style={{ color: 'lightblue' }} />
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}>
          <Text>Relative {degrees}</Text>
        </View>
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}>
          <Text>Relative</Text>
        </View>
        <View
          style={{
            width: 60,
            left: 200,
            top: 0,
            height: 60,
            position: 'absolute',
            backgroundColor: 'black',
          }}>
          <Text style={{color: 'gray'}}>Absolute!</Text>
        </View>
        <View style={{width: 200, height: 30, backgroundColor: 'orange'}} />
      </View>
    );
  }
}

render(<App />, document.getElementById('root'));
