import React from 'react';

class NewsUnit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stateVar1: DataService.getTimeNow()
      };
    }
    render() {
        return <h1>Hello from {this.props.phrase} @ {this.state.stateVar1}?</h1>;
    }
}

export default HelloWorld;
