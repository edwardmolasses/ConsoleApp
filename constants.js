const API_TRANSIT_STOP17 = '59412';
export const STOCKS = ['YHOO',
                'FB',
                'NFLX',
                'AMZN',
                'SQ',
                'TSLA',
                'TTM',
                'GT',
                'KO'];

export const API_STOCKS = "http://query.yahooapis.com/v1/public/yql?q=select%20"
                        + "*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20("
                        + STOCKS.map(function(symbol){ return '%22' + symbol + '%22'; }).join(',')
                        + ")&format=json&env=http://datatables.org/alltables.env";
// export const API_TRANSIT = "http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=oT7nF3oh4EUVqrLkjUuB";
export const API_TRANSIT_KEY = "oT7nF3oh4EUVqrLkjUuB";
export let API_TRANSIT_URI = "http://api.translink.ca/rttiapi/v1/stops/%s/estimates?apikey=" + API_TRANSIT_KEY;
export const API_TRANSIT_STOP17_URI = API_TRANSIT_URI.replace('%s', API_TRANSIT_STOP17);
export const API_ROOT_WEATHER = "http://api.openweathermap.org/data/2.5";
export const API_NEWS = "https://www.reddit.com/r/worldnews/top.json?sort=top&t=day";
export const API_URI_WEATHER_3HOUR = "/forecast/city";
export const API_URI_WEATHER_DAILY = "/forecast/daily";
export const API_KEY_WEATHER = "f1a40122b90a9c556413c1719aff2c6d";
export const API_CITY_ID = "6173331";
export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
