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
        if (stock.symbol) {
          return (
            <h4 key={i}>
            <span className="glow">{stock.symbol}</span>
            <i className="material-icons fs14 glow">play_arrow</i> <strong className={stock.Change > 0 ? "stock-up glow-green" : "stock-down glow-red"}>{stock.LastTradePriceOnly}</strong>
            </h4>
          );
        }
      });
      return (
        <div>
          <h2 className="mb25 glow">
            <i className="material-icons fs30 dn4">trending_up</i> MARKETS
            <div className="h5">LAST UPDATED {this.state.lastUpdated}</div>
          </h2>
          {stocksData}
        </div>
      )
    }
}

export default MarketUnit;
