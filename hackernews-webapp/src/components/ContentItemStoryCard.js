import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faHackerNewsSquare } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import api from '../api';
import StoryCardLoader from './Loaders/StoryCardLoader';
import ConnectionError from './ConnectionError';
import StoryDeleted from './Story/StoryDeleted';
import UserViewLink from './Links/UserViewLink';
import ContentTimeLink from './Links/ContentTimeLink';
import StoryDead from './Story/StoryDead';
import ExternalUrlLink from './Links/ExternalUrlLink';
import ParsedHtmlText from './ParsedHtmlText';

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
        api.get(`item/${itemId}.json`).then((res) => {
          console.log(res.data)
          setStory(res.data);
        }).catch((error) => {
          console.log('ContentItemStoryCard ' + error);
        }).then(() => {
          setIsLoading(false);
        });
      } 
    // }, 1000);
  }, [story, itemId, isLoading]);

  return ( 
    (!story && !itemId) ? null : isLoading ? <StoryCardLoader /> : !story ? <ConnectionError /> : story.deleted ? <StoryDeleted /> : story.dead ? <StoryDead /> : (
      <div className="content-card story-card">
        <aside className="story-score">
          <span title="Story score/karma">{ story.score }</span>
        </aside>

        <section className="story-content" onClick={(e) => handleClick(e, story.id)}>
          <header>
            <span>Posted by <UserViewLink username={story.by} /></span>&nbsp;
            <ContentTimeLink contentId={story.id} contentTime={story.time} />
            <ExternalUrlLink externalUrl={story.url} />
          </header>

          <main>
            <h3 className="story-title">
              <Link to={"/s/" + story.id}>{ story.title }</Link>
            </h3>
            <ExternalUrlLink externalUrl={story.url} text={story.url} title={story.url} />
            { story.text && isDetailed && <ParsedHtmlText htmlText={story.text} /> }
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
    )
  );
}
 
export default ContentItemStoryCard;