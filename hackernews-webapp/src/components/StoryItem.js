import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCommentAlt, faEyeSlash, faFlag } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import { getStory } from './../api';

const StoryItem = ({ storyId }) => {
  const [story, setStory] = useState({});
  const history = useHistory();

  useEffect(() => {
    getStory(storyId).then(data => {
      if (data.type === 'story') {
        setStory(data);
      }
    });
  }, [storyId])

  const handleClick = (e, storyId) => {
    if (!e.target.className.includes('btn')) {
      history.push('/s/' + storyId);
    }
  }

  return ( 
    story && (
      <div className="story-item" onClick={(e) => handleClick(e, story.id)}>
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
            <a href={story.url} target="_blank" rel="noreferrer" className="btn story-url-btn">
              <FontAwesomeIcon className="glyph" icon={faExternalLinkAlt} />
            </a>
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
              <FontAwesomeIcon className="glyph" icon={faCommentAlt} />
              {`${story.descendants} Comments`}
            </Link>
            <span className="btn"><FontAwesomeIcon className="glyph" icon={faShare} /> Share</span>
            <span className="btn"><FontAwesomeIcon className="glyph" icon={faBookmark} /> Save</span>
            <span className="btn"><FontAwesomeIcon className="glyph" icon={faEyeSlash} /> Hide</span>
            <span className="btn"><FontAwesomeIcon className="glyph" icon={faFlag} /> Report</span>
          </footer>
        </section>
      </div>
    )
  );
}
 
export default StoryItem;