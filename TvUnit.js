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
      // $.ajax({
      //   url: 'https://api.trakt.tv/users/edwardmolasses/collection/shows',
      //   type: "GET",
      //   headers: { 'Content-Type'     : 'application/json',
      //              'trakt-api-version': '2',
      //              'trakt-api-key'    : 'd54dfb418cd840befecd83ff1fa27f49fd53925de9ef4e8bf021d47463f3971f'
      //   },
      //   success: function() { console.log('%cSuccess!' + authHeader, 'font-size:25px;color:pink;'); }
      // });

      // $.ajax({
      //   url: 'https://api.trakt.tv/users/edwardmolasses/collection/shows',
      //   type: "GET",
      //   crossDomain: true,
      //   headers: {'Content-Type' : 'application/json',
      //             'trakt-api-version' : '2',
      //             'trakt-api-key' : 'd54dfb418cd840befecd83ff1fa27f49fd53925de9ef4e8bf021d47463f3971f'
      //   },
      //   success: function() { console.log('%cSuccess!' + authHeader, 'font-size:25px;color:pink;'); }
      // }).done(function(msg) {
      //   console.log('finished!: '+ msg );
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
          <h2><i className="material-icons fs30">looks</i> <span className="h5">last updated {this.state.lastUpdated}</span></h2>
          <h3 className="team-title">
            The weather today is {this.state.weatherTodayData}! <i className="material-icons md-36">{this.getWeatherIcon(this.state.weatherTodayData)}</i>
          </h3>
          <h3 className="team-title">
            The weather tomorrow will be {this.state.weatherTomorrowData}! <i className="material-icons md-36">{this.getWeatherIcon(this.state.weatherTomorrowData)}</i>
          </h3>
        </div>
      )
    }
}

export default WeatherUnit;
