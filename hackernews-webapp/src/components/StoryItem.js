import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getStory } from './../api';

const StoryItem = ({ storyId, storyNumber }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => {
      if (data.type === 'story') {
        setStory(data);
      }
    });
  }, [storyId])

  return ( 
    story && (
      <div className="story-item">
        <section className="story-score">
          <span>{ story.score }</span>
        </section>
        <section className="story-content">
          <header>
            <div>
              <span>
                Posted by&nbsp; 
                <Link 
                  to={"/u/" + story.by} 
                  className="link-btn"
                >
                  { "u/" + story.by }
                </Link>
              </span>
              <span>
                &nbsp;
                <Link 
                  to={"/s/" + story.id}
                  className="link-btn"
                  title={moment.unix(story.time).format('LLLL')}
                >
                  { moment.unix(story.time).fromNow() }
                </Link>
              </span>
            </div>
            <a href={story.url} target="_blank" rel="noreferrer">link</a>
          </header>
          <main>
            <h3 className="story-title"><Link to={"/s/" + story.id}>{ story.title }</Link></h3>
            <a className="story-url link-btn" href={story.url} target="_blank" rel="noreferrer">{ story.url }</a>
          </main>
          <footer>
            <Link 
              className="btn"
              to={'/s/' + story.id}
            >
              {`${story.descendants} Comments`}
            </Link>
            <span className="btn">Share</span>
            <span className="btn">Save</span>
            <span className="btn">Hide</span>
            <span className="btn">Report</span>
          </footer>
        </section>
      </div>
    )
  );
}
 
export default StoryItem;