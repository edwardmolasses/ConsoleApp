import React from 'react';
import DataService from './DataService';
import * as CONSTANTS from './constants';

class NewsUnit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newsStories: [],
        lastUpdated: ''
      };
    }

    getNewsFromServer() {
      $.get(CONSTANTS.API_NEWS, data => {
        this.setState({ newsStories: data.data.children.slice(0, 10) });
        this.setState({ lastUpdated: DataService.getDateTimeNow() });
      });
    }

    componentDidMount() {
      this.getNewsFromServer();
      setInterval(() => {
        this.getNewsFromServer();
      }, CONSTANTS.HOUR);
    }

    render() {
      var newsStories = this.state.newsStories.map(function(story, i) {
            return (
              <h4 key={i} className="truncate">
              <a href={'https://www.reddit.com/' + story.data.permalink} target="_blank">{story.data.title}</a>
              </h4>
            );
      });
      return (
        <div>
          <h2><i className="fa fa-globe"></i> <span className="h5">last updated {this.state.lastUpdated}</span></h2>
          {newsStories}
        </div>
      )
    }
}

export default NewsUnit;
