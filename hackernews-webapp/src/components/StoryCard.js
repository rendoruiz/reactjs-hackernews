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

import styles from '../styles/components/StoryCard.module.css'
import buttonStyles from '../styles/components/Button.module.css'

const StoryCard = ({ storyData = null, storyId = null, isDetailed = false }) => {
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
        <aside className={styles.score}>{ story.score }</aside>

        <section className={styles.content} onClick={(e) => handleClick(e, story.id)}>
          <header className={styles.contentHeader}>
            Posted by&nbsp;
            <UserViewLink username={story.by} />&nbsp;
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

          <main>
            <p className={styles.title}>{ story.title }</p>
            <ExternalLink 
              link={story.url} 
              text={story.url} 
              title={story.url} 
            />
            { story.text && isDetailed && <ParsedHtmlText htmlText={story.text} /> }
          </main>

          <footer className={styles.contentFooter}>
            <IconButtonLink 
              link={"/s/" + story.id}
              icon={faCommentAlt}
              text={`${story.descendants ?? "No"} Comments`}
              title="View story comments"
              className={styles.button}
              iconClassName={buttonStyles.buttonIcon}
            />
            <IconButtonLink
              link={"https://news.ycombinator.com/item?id=" + story.id}
              icon={faHackerNewsSquare}
              text="View Original"
              title="View original submission on Hacker News"
              className={styles.button}
              iconClassName={buttonStyles.buttonIcon}
              external
            />
          </footer>
        </section>
      </div>
    )
  );
}
 
export default StoryCard;