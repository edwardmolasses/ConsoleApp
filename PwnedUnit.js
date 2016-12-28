import React from 'react';
import DataService from './DataService';
import Common from './Common';
import * as CONSTANTS from './constants';
import moment from 'moment';

class PwnedUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pwnedList: [],
            lastUpdated: ''
        };
        this.timeFormat = CONSTANTS.TIME_FORMAT;
        this.account = CONSTANTS.EMAIL;
    }

    getPwnedFromServer() {
      $.get(CONSTANTS.API_PWNED_URI + '/' + this.account, data => {
        this.setState({ pwnedList: data });
        this.setState({ lastUpdated: DataService.getDateTimeNow() });
      });
    }

    componentDidMount() {
      this.getPwnedFromServer();
      setInterval(() => {
        this.getPwnedFromServer();
      }, 24 * 7 * CONSTANTS.HOUR);
    }

    render() {
        let pwnedData = this.state.pwnedList.map(function(pwnage, i) {
            let sinceBreach = moment(pwnage.BreachDate).fromNow();
            return (
                <h4 key={i}>
                    <span className="glow-red">{pwnage.Title}</span>
                    <span> <i className="material-icons fs14">lock_open</i> <strong>{sinceBreach}</strong></span>
                </h4>
            );
        });

        return (
            <div>
                <h2 className="mb25 glow-red">
                    <i className="material-icons fs30 dn4">warning</i> HACKS
                </h2>
                <div className="labeled-container labeled-container-alert h70 w300 glow-box-red mr15 mb15">
                    <div className="labeled-container-label labeled-container-label-alert h20 glow-black-red">{this.account}</div>
                    <div className="labeled-container-content labeled-container-content-alert t25 fs30 fwb glow-red">{pwnedData}</div>
                </div>
            </div>
        )
    }
}

export default PwnedUnit;
