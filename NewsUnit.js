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
      let newsStories = this.state.newsStories.map(function(story, i) {
        let removeExcessTitle = function(str) {
            //let splitChars = ['|', ' - '];
            let splitChars = ['|'];
            for (let val of splitChars) {
                str = str.substring(story.data.title.lastIndexOf(val) + 1);
                //console.log(val);
                //console.log(str);
            }
            return str;
        };
        return (
          <li key={i} className="news-link truncate glow fs18 ml-5">
            <a href={CONSTANTS.API_ROOT_REDDIT + story.data.permalink} target="_blank">{removeExcessTitle(story.data.title)}</a>
          </li>
        );
      });
      return (
        <div>
          <h2 className="glow mb25">
            <i className="material-icons fs30 dn4">language</i> NEWS
            <div className="h5">LAST UPDATED {this.state.lastUpdated}</div>
          </h2>
          <ul>
            {newsStories}
          </ul>
        </div>
      )
    }
}

export default NewsUnit;
