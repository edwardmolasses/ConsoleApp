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
          <h4 key={i} className="truncate glow">
          <a href={'https://www.reddit.com/' + story.data.permalink} target="_blank">{story.data.title}</a>
          </h4>
        );
      });
      return (
        <div>
          <h2 className="glow mb25">
            <i className="material-icons fs30 dn4">language</i> NEWS
            <div className="h5">LAST UPDATED {this.state.lastUpdated}</div>
          </h2>
          {newsStories}
        </div>
      )
    }
}

export default NewsUnit;
