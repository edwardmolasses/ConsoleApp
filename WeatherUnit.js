import React from 'react';
import DataService from './DataService';
import * as CONSTANTS from './constants';

class WeatherUnit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        weatherTodayData: [],
        weatherTomorrowData: [],
        lastUpdated: ''
      };
    }

    getWeatherIcon(weatherMessage) {
      if (~weatherMessage.indexOf('rain'))
        return 'fa-umbrella';
      if (~weatherMessage.indexOf('sun') ||
          ~weatherMessage.indexOf('clear'))
        return 'fa-sun-o';
      if (~weatherMessage.indexOf('cloud'))
        return 'fa-cloud';
      if (~weatherMessage.indexOf('storm') ||
          ~weatherMessage.indexOf('lightning') ||
          ~weatherMessage.indexOf('thunder'))
        return 'fa-bolt';
      return null;
    }

    getWeatherFromServer() {
      $.get(CONSTANTS.API_ROOT_WEATHER + CONSTANTS.API_URI_WEATHER_3HOUR + '?id=' + CONSTANTS.API_CITY_ID + '&APPID=' + CONSTANTS.API_KEY_WEATHER, data => {
        this.setState({ weatherTodayData: data.list[0].weather[0].description });
        this.setState({ weatherTomorrowData: data.list[1].weather[0].description });
        this.setState({ lastUpdated: DataService.getDateTimeNow() });
      });
      // $.ajax({
      //   url: 'https://api.trakt.tv/users/edwardmolasses/collection/shows',
      //   type: "GET",
      //   headers: { 'Content-Type'     : 'application/json',
      //              'trakt-api-version': '2',
      //              'trakt-api-key'    : 'd54dfb418cd840befecd83ff1fa27f49fd53925de9ef4e8bf021d47463f3971f'
      //   },
      //   success: function() { console.log('%cSuccess!' + authHeader, 'font-size:25px;color:pink;'); }
      // });
    }

    componentDidMount() {
      this.getWeatherFromServer();
      setInterval(() => {
        this.getWeatherFromServer();
      }, 6 * CONSTANTS.HOUR);
    }

    render() {
      return (
        <div>
          <h2><i className="fa fa-tint"></i> <span className="h5">last updated {this.state.lastUpdated}</span></h2>
          <h3 className="team-title">
            The weather today is {this.state.weatherTodayData}! <i className={"fa " + this.getWeatherIcon(this.state.weatherTodayData)}></i>
          </h3>
          <h3 className="team-title">
            The weather tomorrow will be {this.state.weatherTomorrowData}! <i className={"fa " + this.getWeatherIcon(this.state.weatherTomorrowData)}></i>
          </h3>
        </div>
      )
    }
}

export default WeatherUnit;
