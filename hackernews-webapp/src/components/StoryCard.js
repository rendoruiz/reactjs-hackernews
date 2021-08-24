import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faHackerNewsSquare } from '@fortawesome/free-brands-svg-icons';

import api from '../api';
import StoryCardLoader from './Loaders/StoryCardLoader';
import ConnectionError from './ConnectionError';
import StoryDeleted from './Story/StoryDeleted';
import UserViewLink from './Links/UserViewLink';
import DateTimeContentLink from './Links/DateTimeContentLink';
import StoryDead from './Story/StoryDead';
import ExternalUrlLink from './Links/ExternalUrlLink';
import ParsedHtmlText from './ParsedHtmlText';
import IconButtonLink from './Links/IconButtonLink';
import styles from '../styles/StoryCard.module.css'

const StoryCard = ({ storyData = null, storyId = null, isDetailed = false }) => {
  const history = useHistory();
  const [story, setStory] = useState(storyData ?? null);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (e, id) => {
    if (e.target.nodeName !== 'A') {
      history.push('/s/' + id);
    }
  }

  useEffect(() => {
    // fetch story data from server if only storyId is provided
    if (story && !storyId) {
      setIsLoading(false);
    } else if (!story && storyId) {
      api.get(`item/${storyId}.json`).then((response) => {
        setStory(response.data);
      }).catch((error) => {
        console.log('StoryCard ' + error);
      }).then(() => {
        setIsLoading(false);
      });
    } 
  }, [storyId, story, isLoading]);

  return ( 
    (!story && !storyId) ? null : isLoading ? <StoryCardLoader /> : !story ? <ConnectionError /> : story.deleted ? <StoryDeleted /> : story.dead ? <StoryDead /> : (
      <div className="content-card story-card">
        <aside className="story-score">
          <span title="Story score/karma">{ story.score }</span>
        </aside>

        <section className={styles.storyContent} onClick={(e) => handleClick(e, story.id)}>
          <header>
            <span>Posted by </span><UserViewLink username={story.by} />&nbsp;
            <DateTimeContentLink contentId={story.id} contentTime={story.time} />
            <IconButtonLink
              link={story.url}
              icon={faExternalLinkAlt}
              title="View link in new tab"
              external
            />
          </header>

          <main>
            <p>{ story.title }</p>
            <ExternalUrlLink externalUrl={story.url} text={story.url} title={story.url} />
            { story.text && isDetailed && <ParsedHtmlText htmlText={story.text} /> }
          </main>

          <footer>
            <IconButtonLink 
              link={"/s/" + story.id}
              icon={faCommentAlt}
              text={`${story.descendants ?? "No"} Comments`}
              title="View story comments"
            />
            <IconButtonLink
              link={"https://news.ycombinator.com/item?id=" + story.id}
              icon={faHackerNewsSquare}
              text="View Original"
              title="View original submission on Hacker News"
              external
            />
          </footer>
        </section>
      </div>
    )
  );
}
 
export default StoryCard;