import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faHackerNewsSquare } from '@fortawesome/free-brands-svg-icons';

import api from '../api';
import StoryCardLoader from './Loaders/StoryCardLoader';
import ConnectionError from './ConnectionError';
import StoryDeleted from './Story/StoryDeleted';
import StoryDead from './Story/StoryDead';
import UserViewLink from './Links/UserViewLink';
import DateTimeContentLink from './Links/DateTimeContentLink';
import ExternalLink from './Links/ExternalLink';
import ParsedHtmlText from './ParsedHtmlText';
import IconButtonLink from './Links/IconButtonLink';
import StoryViewLink from './Links/StoryViewLink';

import styles from '../styles/components/StoryCard.module.css'
import buttonStyles from '../styles/components/Button.module.css'
import PollGroup from './PollGroup';

const StoryCard = ({ storyData, storyId, isDetailed = false }) => {
  const history = useHistory();
  const [story, setStory] = useState(storyData ?? null);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (e, id) => {
    if (e.target.nodeName !== 'A' && e.target.nodeName !== 'svg') {
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
      <div className={isDetailed ? styles.detailedStoryCard : styles.storyCard}>
        <aside className={styles.score} title="story score/karma">{ story.score }</aside>

        <section className={styles.content} onClick={(e) => handleClick(e, story.id)}>
          <header className={styles.header}>
            Posted by&nbsp;
            <UserViewLink userId={story.by} />&nbsp;
            <DateTimeContentLink 
              contentId={story.id} 
              contentTime={story.time} 
            />
            <ExternalLink 
              link={story.url} 
              title="View story link in new tab" 
              className={styles.externalLinkButton}
              iconClassName={buttonStyles.buttonIcon}
            /> 
          </header>

          <main className={styles.main}>
            <StoryViewLink storyId={story.id} text={story.title} className={styles.title} />
            <ExternalLink 
              link={story.url} 
              text={story.url}
            />
            { isDetailed && <ParsedHtmlText htmlText={story.text} className={styles.text} /> }
            { isDetailed && story.type === 'poll' && story.parts && <PollGroup /> }
          </main>

          <footer className={styles.footer}>
            <IconButtonLink 
              link={"/s/" + story.id}
              icon={faCommentAlt}
              text={`${story.descendants > 0 ? story.descendants : "No"} Comment${story.descendants > 1 ? "s" : ""}`}
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