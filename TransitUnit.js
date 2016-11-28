import React from 'react';
import DataService from './DataService';
import * as CONSTANTS from './constants';

class TransitUnit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    getTransitFromServer() {
      $.get(CONSTANTS.API_TRANSIT_STOP17_URI, data => {
        console.log(data);
      });
    }

    componentDidMount() {
      this.getTransitFromServer();
      setInterval(() => {
        this.getTransitFromServer();
      }, CONSTANTS.HOUR);
    }

    render() {
      return (
        <div>
          hello world transit
        </div>
      )
    }
}

export default TransitUnit;
