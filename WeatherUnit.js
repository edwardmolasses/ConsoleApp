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
        return 'beach_access';
      if (~weatherMessage.indexOf('sun') ||
          ~weatherMessage.indexOf('clear'))
        return 'wb_sunny';
      if (~weatherMessage.indexOf('cloud'))
        return 'filter_drama';
      if (~weatherMessage.indexOf('snow'))
        return 'ac_unit';
      if (~weatherMessage.indexOf('storm') ||
          ~weatherMessage.indexOf('lightning') ||
          ~weatherMessage.indexOf('thunder'))
        return 'flash_on';
      return null;
    }

    getWeatherFromServer() {
      $.get(CONSTANTS.API_ROOT_WEATHER + CONSTANTS.API_URI_WEATHER_3HOUR + '?id=' + CONSTANTS.API_CITY_ID + '&APPID=' + CONSTANTS.API_KEY_WEATHER, data => {
        this.setState({ weatherTodayData: data.list[0].weather[0].description });
        this.setState({ weatherTomorrowData: data.list[1].weather[0].description });
        this.setState({ lastUpdated: DataService.getDateTimeNow() });
      });
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
          <h2 className="glow">
            <i className="material-icons fs30 dn4">streetview</i> WEATHER
            <div className="h5">LAST UPDATED {this.state.lastUpdated}</div>
          </h2>
          <h3 className="team-title glow">
            The weather today is {this.state.weatherTodayData}! <i className="material-icons md-36">{this.getWeatherIcon(this.state.weatherTodayData)}</i>
          </h3>
          <h3 className="team-title glow">
            The weather tomorrow will be {this.state.weatherTomorrowData}! <i className="material-icons md-36">{this.getWeatherIcon(this.state.weatherTomorrowData)}</i>
          </h3>
        </div>
      )
    }
}

export default WeatherUnit;
