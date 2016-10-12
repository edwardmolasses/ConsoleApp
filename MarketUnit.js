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

      {this.state.stocksData.map(function(stock, i) {
        return (
          <h4 key={i}>
            {stock.symbol} <span className="fa fa-arrow-right"></span> <strong className={stock.Change > 0 ? "stock-up" : "stock-down"}>{stock.Ask}</strong>
          </h4>
        );
      })}

      var stocksData = this.state.stocksData.map(function(stock, i) {
        return (
          <h4 key={i}>
            {stock.symbol} <span className="fa fa-arrow-right"></span> <strong className={stock.Change > 0 ? "stock-up" : "stock-down"}>{stock.Ask}</strong>
          </h4>
        );
      });
      return (
        <div>
          <h2><i className="fa fa-money"></i> <span className="h5">last updated {this.state.lastUpdated}</span></h2>
          {stocksData}
        </div>
      )
    }
}

export default MarketUnit;
