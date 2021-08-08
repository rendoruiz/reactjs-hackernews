import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faHackerNewsSquare } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { getItemData } from '../functions/hackernewsApi';

const ContentItemStoryCard = ({ storyObject = null, itemId = null, isDetailed = false }) => {
  const history = useHistory();
  const [story, setStory] = useState(storyObject ?? null);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (e, storyId) => {
    if (!e.target.className.includes('btn')) {
      history.push('/s/' + storyId);
    }
  }

  useEffect(() => {
    // setTimeout(() => {
      if (story && !itemId) {
        setIsLoading(false);
      } else if (!story && itemId) {
        getItemData(itemId).then((data) => {
          setStory(data);
          setIsLoading(false);
        });
      } 
    // }, 1000);
  }, [story, itemId, isLoading]);

  return ( 
    (!story && !itemId) ? null : isLoading ? <span>Loading story card...</span> : story.deleted ? null : story.dead ? null :
      <div className="content-card story-card">
        <aside className="story-score">
          <span title="Story score/karma">{ story.score }</span>
        </aside>

        <section className="story-content" onClick={(e) => handleClick(e, story.id)}>
          <header>
            <span>
              Posted by&nbsp; 
              <Link 
                to={"/u/" + story.by} 
                className="link-btn"
                title="Open user page"
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
            <a href={story.url} target="_blank" rel="noreferrer" className="btn story-url-btn" title="Open story link in new tab">
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
            { story.text && isDetailed &&
              <div className="story-text link-btn">
                { ReactHtmlParser(story.text.replaceAll(/href/g, `target="_blank" rel="noreferrer" href`)) }
              </div>
            }
          </main>

          <footer>
            <Link 
              className="btn"
              to={'/s/' + story.id}
            >
              <FontAwesomeIcon className="glyph" icon={faCommentAlt} />
              {`${story.descendants ?? 'No'} Comments`}
            </Link>
            {/* <span className="btn"><FontAwesomeIcon className="glyph" icon={faShare} /> Share</span>
            <span className="btn"><FontAwesomeIcon className="glyph" icon={faBookmark} /> Save</span>
            <span className="btn"><FontAwesomeIcon className="glyph" icon={faEyeSlash} /> Hide</span> */}
            <a 
              className="btn"
              href={'https://news.ycombinator.com/item?id=' + story.id}
              target="_blank" rel="noreferrer"
              title="View story on Hacker News"
            >
              <FontAwesomeIcon className="glyph" icon={faHackerNewsSquare} />
              View Original
            </a>
          </footer>
        </section>
      </div>
  );
}
 
export default ContentItemStoryCard;