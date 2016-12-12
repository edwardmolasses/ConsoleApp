import React from 'react';
import DataService from './DataService';
import * as CONSTANTS from './constants';

class MarketUnit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stocksData: [],
        lastUpdated: ''
      };
    }

    getStocksFromServer() {
      $.get(CONSTANTS.API_STOCKS, data => {
        this.setState({ stocksData: data.query.results.quote });
        this.setState({ lastUpdated: DataService.getDateTimeNow() });
      });
    }

    componentDidMount() {
      this.getStocksFromServer();
      setInterval(() => {
        this.getStocksFromServer();
      }, CONSTANTS.HOUR);
    }

    render() {
      var stocksData = this.state.stocksData.map(function(stock, i) {
        return (
          <h4 key={i}>
            <span className="text-glow">{stock.symbol}</span>
            <i className="material-icons fs14 text-glow">play_arrow</i> <strong className={stock.Change > 0 ? "stock-up text-glow-green" : "stock-down text-glow-red"}>{stock.Ask}</strong>
          </h4>
        );
      });
      return (
        <div>
          <h2 className="mb25 text-glow">
            <i className="material-icons fs30 dn4">trending_up</i> MARKETS
            <div className="h5">last updated {this.state.lastUpdated}</div>
          </h2>
          {stocksData}
        </div>
      )
    }
}

export default MarketUnit;
