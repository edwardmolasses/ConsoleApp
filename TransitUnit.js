import React from 'react';
import DataService from './DataService';
import * as CONSTANTS from './constants';
import moment from 'moment';

class TransitUnit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nextBusesArr: [],
            lastUpdated: ''
        };
        this.timeFormat = CONSTANTS.TIME_FORMAT;
    }

    getBusSchedule() {
        return CONSTANTS.BUS_SCHEDULE;
    }

    getNextBusIndex(busScheduleArr, travelTimeToStop) {
        let timeFormat = this.timeFormat;
        let timeNow = moment(DataService.getTimeNow24(), timeFormat);
        let timeDifference;
        let nextBusIndex = busScheduleArr.findIndex(function(busTime) {
            busTime = moment(busTime, timeFormat);
            timeDifference = moment(busTime, timeFormat).diff(timeNow);
            return moment(busTime).isAfter(timeNow) && timeDifference > travelTimeToStop;
        });

        return nextBusIndex;
    }

    getTransitFromServer() {
        let nextBuses = [];
        let nextBusArrIndices = [];
        let busTimesArr = [];
        let nextBusesSorted;

        this.getBusSchedule().map((val) => {
            nextBusArrIndices[Object.keys(val)] = this.getNextBusIndex(val[Object.keys(val)], CONSTANTS.TRAVEL_TIME_TO_BUS);
        });
        this.getBusSchedule().map((val) => {
            busTimesArr = val[Object.keys(val)];
            nextBuses.push({number: Object.keys(val), time: moment(busTimesArr[nextBusArrIndices[Object.keys(val)]], this.timeFormat)});
            nextBuses.push({number: Object.keys(val), time: moment(busTimesArr[nextBusArrIndices[Object.keys(val)] + 1], this.timeFormat)});
        });
        nextBusesSorted = nextBuses.sort(function(a, b){
            return a.time - b.time;
        });
        this.setState({ nextBusesArr: nextBusesSorted });
        this.setState({ lastUpdated: DataService.getDateTimeNow() });
    }

    componentDidMount() {
        this.getTransitFromServer();
        setInterval(() => {
            this.getTransitFromServer();
        }, CONSTANTS.MINUTE);
    }

    render() {
        let busListings = this.state.nextBusesArr.map((bus, i) => {
            let timeNow = moment(DataService.getTimeNow24(), this.timeFormat);
            let nextBusTime = moment(bus.time).format(this.timeFormat);
            let timeTillNextBus = (moment(bus.time).diff(timeNow) / 1000) / 60;

            return (
                <div key={i} className="flex-di flex-row flex-jl">
                    <div className="labeled-container h70 w50 glow-box mr15 mb15">
                        <div className="labeled-container-label h20 glow-black">BUS</div>
                        <div className="labeled-container-content t25 fs30 fwb glow">{bus.number}</div>
                    </div>
                    <div className="labeled-container h70 w170 glow-box mr15">
                        <div className="labeled-container-label h20 glow-black">NEXT @</div>
                        <div className="labeled-container-content t29 fs22 glow">{nextBusTime}</div>
                    </div>
                    <div className="labeled-container h70 w170 glow-box">
                        <div className="labeled-container-label h20 glow-black">IN</div>
                        <div className="labeled-container-content t29 fs22 glow">{timeTillNextBus} mins</div>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <h2 className="glow">
                    <i className="material-icons fs30 dn4">directions_bus</i> TRANSIT
                    <div className="h5">LAST UPDATED {this.state.lastUpdated}</div>
                </h2>
                <div className="mt25">
                    {busListings}
                </div>
            </div>
        )
    }
}

export default TransitUnit;
