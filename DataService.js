class DataService {
  static getDateTimeNow() {
    return this.getDateNow() + ' ' + this.getTimeNow();
  }

  static getDateNow() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  static getTimeNow() {
    var now = new Date();
    var h = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    var m = ('0' + now.getMinutes()).slice(-2);
    var period = now.getHours() > 12 ? 'pm' : 'am';

    return h + ':' + m + ' ' + period;
  }

  static getWeatherIcon() {
    if (~weather_message.indexOf('rain'))
      return 'fa-umbrella';
    if (~weather_message.indexOf('sun') ||
        ~weather_message.indexOf('clear'))
      return 'fa-sun-o';
    if (~weather_message.indexOf('cloud'))
      return 'fa-cloud';
    // if (~weather_message.indexOf('clear'))
    //   return 'fa-thumbs-o-up';
    if (~weather_message.indexOf('storm') ||
        ~weather_message.indexOf('lightning') ||
        ~weather_message.indexOf('thunder'))
      return 'fa-bolt';
    return null;
  }

  static getNewsFromServer() {

    setTimeout(function() {
      $.get(API_NEWS, data => {
        // data.data.children.map(function(story) { console.log(story.data.title+'\n'); });
        var newsStories = [];
        newsStories = data.data.children.slice(0, 10);
        console.log(newsStories);
        return newsStories;
        // this.setState({ news: data.data.children.slice(0, 10) });
        // this.setState({ news_update_time: this.getTimeNow() + ' on ' + this.getDateNow() });
        // console.log('today date: '+this.getDateNow());
      });
    }, 0);
  }

  static getStocksFromServer() {
    $.get(API_STOCKS, data => {
      console.log(API_STOCKS);
      console.log(data.query.results.quote);
      data.query.results.quote.map(function(stock) { console.log(stock.Ask+'\n'); });
      this.setState({ stocks: data.query.results.quote });
      this.setState({ stock_counter: this.state.stock_counter+1 });
      this.setState({ stocks_update_time: this.getTimeNow() + ' on ' + this.getDateNow() });
      console.log('stock call counter: '+this.state.stock_counter);
    });
  }

  static getWeatherForecastFromServer() {
    // console.log(API_ROOT_WEATHER + API_URI_WEATHER_3HOUR + '?id=' + API_CITY_ID + '&APPID=' + API_KEY_WEATHER);
    $.get(API_ROOT_WEATHER + API_URI_WEATHER_3HOUR + '?id=' + API_CITY_ID + '&APPID=' + API_KEY_WEATHER, data => {
      this.setState({ tomorrow_weather: data.list[1].weather[0].description });
      this.setState({ today_weather: data.list[0].weather[0].description });
      this.setState({ counter: this.state.counter+1 });
      this.setState({ weather_update_time: this.getTimeNow() + ' on ' + this.getDateNow() });
      console.log(data.list[1].weather[0].description);
      console.log('weather call counter: '+this.state.counter);
    });
  }

}

export default DataService;
