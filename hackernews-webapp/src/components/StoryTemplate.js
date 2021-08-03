import { Link, useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faCommentAlt, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const StoryTemplate = ({ story, isDetailedView = false }) => {
  const history = useHistory();

  const handleClick = (e, storyId) => {
    if (!e.target.className.includes('btn')) {
      history.push('/s/' + storyId);
    }
  }

  return ( 
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
            <FontAwesomeIcon className="glyph" icon={faExternalLinkAlt} visibility={!story.url ? 'hidden' : 'visible'} />
          </a>
        </header>
        <main>
          <h3 className="story-title"><Link to={"/s/" + story.id}>{ story.title }</Link></h3>
          <a 
            className="story-url link-btn" 
            href={story.url} 
            target="_blank" 
            rel="noreferrer"
            title={story.url}
          >
            { story.url && <span>{ story.url }</span> }
            { story.url && <FontAwesomeIcon className="inline-glyph" icon={faExternalLinkAlt} /> }
          </a>
          {
            story.text && isDetailedView &&
            <div className="story-text link-btn">
              { ReactHtmlParser(story.text) }
            </div>
          }
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
        </footer>
      </section>
    </div>
  );
}
 
export default StoryTemplate;