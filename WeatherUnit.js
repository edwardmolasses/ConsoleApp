import React from 'react';
import DataService from './DataService';
import * as CONSTANTS from './constants';

class WeatherUnit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        forecastToday: [],
        forecastOtherDays: [],
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
      $.ajax({url: CONSTANTS.API_ROOT_YAHOO_WEATHER,
              success: json_weather => {
          var todayForecast = json_weather.query.results.channel.item.forecast.shift();

          todayForecast.text = todayForecast.text.toUpperCase().split(' ');
          this.setState({ forecastToday: todayForecast });
console.log(this.state.forecastToday.text);
          this.setState({ forecastOtherDays: json_weather.query.results.channel.item.forecast });
          this.setState({ lastUpdated: DataService.getDateTimeNow() });
          console.log(json_weather.query.results.channel.item.forecast);
        }
      })
    }

    componentDidMount() {
      this.getWeatherFromServer();
      setInterval(() => {
        this.getWeatherFromServer();
      }, 6 * CONSTANTS.HOUR);
    }

    render() {
        var forecastOtherDaysList = this.state.forecastOtherDays.map(function(dayForecast, i) {
            return (
                <span key={i} className="glow mr15 fs35">
                    <div className="tac mb10"><i className={"wi wi-yahoo-" + dayForecast.code}></i></div>
                    <div className="fs14 tac">{dayForecast.day.toUpperCase()}</div>
                </span>
            );
        });
        //var forecastTodayText = this.state.forecastToday.text.map(function(dayForecastText, i) {
        //    return (
        //        <div key={i}>{dayForecastText}</div>
        //    )
        //});
        return (
            <div>
                <h2 className="glow mb25">
                    <i className="material-icons fs30 dn4">streetview</i> WEATHER
                    <div className="h5">LAST UPDATED {this.state.lastUpdated}</div>
                </h2>
                <h4 className="team-title glow mb15">Today</h4>
                <div className="flex-di flex-row flex-jl">
                    <div className="tal fs35 mb15 mr15">
                        <div className="tac mb10"><i className={"wi wi-yahoo-" + this.state.forecastToday.code}></i></div>
                    </div>
                    <span className="w60 up3">
                        <div className="flex-di flex-row flex-jsp fs14">
                            <span>HI</span>
                            <span>{this.state.forecastToday.high} &deg;C</span>
                        </div>
                        <div className="flex-di flex-row flex-jsp fs14">
                            <span>LO</span>
                            <span>{this.state.forecastToday.low} &deg;C</span>
                        </div>
                    </span>
                </div>
                <h4 className="team-title glow mb15">Nine Day Forecast</h4>
                <div className="flex-di flex-row flex-jl">
                    {forecastOtherDaysList}
                </div>
            </div>
        )
    }
}

export default WeatherUnit;
