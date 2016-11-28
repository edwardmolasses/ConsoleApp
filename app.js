// import HelloWorld from './hello-world';
import DataService from './DataService';
import WeatherUnit from './WeatherUnit';
import NewsUnit from './NewsUnit';
import MarketUnit from './MarketUnit';
import TransitUnit from './TransitUnit';
import React from 'react';
import ReactDOM from 'react-dom';

class ConsoleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateVar1: DataService.getTimeNow()
    };
  }
  render() {
    return (
      <div>
        <WeatherUnit />
        <br />
        <NewsUnit />
        <br />
        <MarketUnit />
        <br />
        <TransitUnit />
      </div>
    )
  }
}

ReactDOM.render(
    <ConsoleApp />,
    document.querySelector('.root')
);
