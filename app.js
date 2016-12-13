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
        <div className="flex-di flex-row flex-jl">
          <MarketUnit />
          <div className="mr90"></div>
          <WeatherUnit />
          <div className="mr90"></div>
          <TransitUnit />
        </div>
        <br />
        <NewsUnit />
      </div>
    )
  }
}

ReactDOM.render(
    <ConsoleApp />,
    document.querySelector('.root')
);
