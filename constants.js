const API_TRANSIT_STOP17 = '59412';
export const STOCKS = ['YHOO',
                'FB',
                'NFLX',
                'AMZN',
                'SQ',
                'TSLA',
                'TTM',
                'GT',
                'WTI',
                'ISRG',
                'IRBT',
                'KO'];

export const API_STOCKS = "http://query.yahooapis.com/v1/public/yql?q=select%20"
                        + "*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20("
                        + STOCKS.map(function(symbol){ return '%22' + symbol + '%22'; }).join(',')
                        + ")&format=json&env=http://datatables.org/alltables.env";
// export const API_TRANSIT = "http://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=oT7nF3oh4EUVqrLkjUuB";
export const API_TRANSIT_KEY = "oT7nF3oh4EUVqrLkjUuB";
export let API_TRANSIT_URI = "http://api.translink.ca/rttiapi/v1/stops/%s/estimates?apikey=" + API_TRANSIT_KEY;
export const API_TRANSIT_STOP17_URI = API_TRANSIT_URI.replace('%s', API_TRANSIT_STOP17);
export const API_PWNED_URI = 'https://haveibeenpwned.com/api/v2/breachedaccount';
export const API_NEWS = "https://www.reddit.com/r/worldnews/top.json?sort=top&t=day";
export const API_ROOT_REDDIT = "https://www.reddit.com/";
export const API_ROOT_WEATHER = "http://api.openweathermap.org/data/2.5";
export const API_ROOT_YAHOO_WEATHER = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast"+
                                      "%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D" +
                                      "%22vancouver%2C%20bc%22)%20%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
export const API_URI_WEATHER_3HOUR = "/forecast/city";
export const API_KEY_WEATHER = "f1a40122b90a9c556413c1719aff2c6d";
export const API_CITY_ID = "6173331";
export const EMAIL = "alachkovics@gmail.com";
export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const TIME_FORMAT = 'h:mm a';

export const TRAVEL_TIME_TO_BUS = 3 * 60 * 1000;
export const BUS_SCHEDULE = [
  {
    9: [
      '00:09',
      '00:23',
      '00:39',
      '00:53',
      '01:08',
      '01:23',
      '01:53',
      '04:45',
      '05:05',
      '05:25',
      '05:35',
      '05:45',
      '05:55',
      '06:05',
      '06:15',
      '06:25',
      '06:35',
      '06:43',
      '06:51',
      '06:55',
      '07:00',
      '07:04',
      '07:09',
      '07:13',
      '07:18',
      '07:22',
      '07:27',
      '07:31',
      '07:36',
      '07:40',
      '07:45',
      '07:51',
      '07:56',
      '08:02',
      '08:07',
      '08:13',
      '08:18',
      '08:24',
      '08:29',
      '08:35',
      '08:40',
      '08:46',
      '08:51',
      '08:57',
      '09:02',
      '09:08',
      '09:13',
      '09:19',
      '09:26',
      '09:32',
      '09:39',
      '09:45',
      '09:52',
      '09:58',
      '10:05',
      '10:11',
      '10:18',
      '10:24',
      '10:31',
      '10:37',
      '10:44',
      '10:50',
      '10:57',
      '11:03',
      '11:10',
      '11:16',
      '11:23',
      '11:29',
      '11:36',
      '11:42',
      '11:49',
      '11:55',
      '12:02',
      '12:08',
      '12:15',
      '12:21',
      '12:28',
      '12:32',
      '12:41',
      '12:47',
      '12:54',
      '13:00',
      '13:07',
      '13:13',
      '13:21',
      '13:26',
      '13:33',
      '13:39',
      '13:46',
      '13:52',
      '13:59',
      '14:05',
      '14:12',
      '14:18',
      '14:25',
      '14:31',
      '14:36',
      '14:41',
      '14:46',
      '14:51',
      '14:56',
      '15:01',
      '15:06',
      '15:11',
      '15:16',
      '15:21',
      '15:26',
      '15:31',
      '15:36',
      '15:41',
      '15:46',
      '15:51',
      '15:55',
      '15:59',
      '16:03',
      '16:07',
      '16:11',
      '16:15',
      '16:19',
      '16:23',
      '16:27',
      '16:31',
      '16:36',
      '16:41',
      '16:46',
      '16:51',
      '16:56',
      '17:01',
      '17:06',
      '17:11',
      '17:16',
      '17:21',
      '17:26',
      '17:31',
      '17:36',
      '17:41',
      '17:46',
      '17:51',
      '17:57',
      '18:04',
      '18:10',
      '18:17',
      '18:23',
      '18:30',
      '18:36',
      '18:43',
      '18:52',
      '19:02',
      '19:12',
      '19:22',
      '19:32',
      '19:42',
      '19:52',
      '20:02',
      '20:13',
      '20:23',
      '20:33',
      '20:42',
      '20:52',
      '21:02',
      '21:12',
      '21:22',
      '21:32',
      '21:43',
      '21:54',
      '22:04',
      '22:14',
      '22:24',
      '22:33',
      '22:43',
      '22:54',
      '23:09',
      '23:24',
      '23:39',
      '23:54'
    ]
  },
  {
    17: [
      '00:15',
      '00:45',
      '01:17',
      '05:32',
      '05:47',
      '06:02',
      '06:17',
      '06:32',
      '06:45',
      '06:55',
      '07:04',
      '07:13',
      '07:22',
      '07:31',
      '07:38',
      '07:47',
      '07:55',
      '08:03',
      '08:12',
      '08:21',
      '08:29',
      '08:37',
      '08:45',
      '08:53',
      '09:01',
      '09:09',
      '09:18',
      '09:26',
      '09:35',
      '09:44',
      '09:53',
      '10:03',
      '10:13',
      '10:25',
      '10:38',
      '10:53',
      '11:08',
      '11:23',
      '11:38',
      '11:54',
      '12:09',
      '12:24',
      '12:39',
      '12:54',
      '13:09',
      '13:24',
      '13:39',
      '13:54',
      '14:09',
      '14:24',
      '14:37',
      '14:48',
      '14:59',
      '15:10',
      '15:20',
      '15:30',
      '15:40',
      '15:48',
      '15:56',
      '16:03',
      '16:11',
      '16:19',
      '16:27',
      '16:35',
      '16:43',
      '16:51',
      '16:59',
      '17:07',
      '17:15',
      '17:22',
      '17:29',
      '17:37',
      '17:44',
      '17:52',
      '18:02',
      '18:14',
      '18:29',
      '18:44',
      '19:00',
      '19:15',
      '19:30',
      '19:45',
      '20:07',
      '20:27',
      '20:47',
      '21:07',
      '21:27',
      '21:47',
      '22:07',
      '22:27',
      '22:47',
      '23:07',
      '23:27',
      '23:45'
    ]
  }
];
