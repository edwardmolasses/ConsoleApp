import React from 'react';
import DataService from './DataService';
import * as CONSTANTS from './constants';
import moment from 'moment';

class TransitUnit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nextNo9: '',
        nextNo17: '',
        tillNextNo9: '',
        tillNextNo17: '',
        lastUpdated: '',
        timeFormat: 'h:mm a'
      };
    }

    getNextBus(busScheduleArr, travelTimeToStop) {
      var timeFormat = this.state.timeFormat;
      var timeNow = moment(DataService.getTimeNow24(), timeFormat);
      var busTime;
      var timeDifference;

      var nextBusIndex = busScheduleArr.findIndex(function(busTime) {
        busTime = moment(busTime, timeFormat);
        timeDifference = moment(busTime, timeFormat).diff(timeNow);

        return moment(busTime).isAfter(timeNow) && timeDifference > travelTimeToStop;
      });

      return busScheduleArr[nextBusIndex];
    }

    getTransitFromServer() {
      var nextNo9BusTime = moment(this.getNextBus(CONSTANTS.NO9_BUS_SCHEDULE, CONSTANTS.TRAVEL_TIME_TO_NO9), this.state.timeFormat);
      var nextNo17BusTime = moment(this.getNextBus(CONSTANTS.NO17_BUS_SCHEDULE, CONSTANTS.TRAVEL_TIME_TO_NO17), this.state.timeFormat);
      var timeNow = moment(DataService.getTimeNow24(), this.state.timeFormat);

      this.setState({ nextNo9: moment(nextNo9BusTime).format(this.state.timeFormat) });
      this.setState({ nextNo17: moment(nextNo17BusTime).format(this.state.timeFormat) });
      this.setState({ tillNextNo9: (moment(nextNo9BusTime).diff(timeNow) / 1000) / 60 });
      this.setState({ tillNextNo17: (moment(nextNo17BusTime).diff(timeNow) / 1000) / 60 });
      this.setState({ lastUpdated: DataService.getDateTimeNow() });
    }

    componentDidMount() {
      this.getTransitFromServer();
      setInterval(() => {
        this.getTransitFromServer();
      }, CONSTANTS.MINUTE);
    }

    render() {
      return (
        <div>
          <h2 className="text-glow">
            <i className="material-icons fs30 dn4">directions_bus</i> TRANSIT
            <div className="h5">last updated {this.state.lastUpdated}</div>
          </h2>
          <h3 className="team-title text-glow">
            #9 Bus @ {this.state.nextNo9} <i className="material-icons fs14 text-glow">play_arrow</i> in <span className="time-till-bus">{this.state.tillNextNo9} minutes</span>
          </h3>
          <h3 className="team-title text-glow">
            #17 Bus @ {this.state.nextNo17} <i className="material-icons fs14 text-glow">play_arrow</i> in <span className="time-till-bus">{this.state.tillNextNo17} minutes</span>
          </h3>
        </div>
      )
    }
}

export default TransitUnit;
