import { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faNewspaper, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import UserContentItem from '../components/UserContentItem';
import { generateHslColor } from '../functions/generateHslColor';
import { faHackerNewsSquare } from '@fortawesome/free-brands-svg-icons';

import api from '../api';
import NavigationItem from '../components/NavigationItem';
import NavigationBar from '../components/NavigationBar';
import IconButtonLink from '../components/Links/IconButtonLink';
import UserViewLoader from '../components/Loaders/UserViewLoader';
import UserInvalid from '../components/User/UserInvalid';

import styles from '../styles/views/UserView.module.css';
import UserIcon from '../components/User/UserIcon';
import ParsedHtmlText from '../components/ParsedHtmlText';

const UserView = () => {
  const { userId } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [contentIdList, setContentIdList] = useState([]);
  const [contentTypeFilter, setContentTypeFilter] = useState(null);
  const contentCountIncrement = 10;
  const [contentCount, setContentCount] = useState(contentCountIncrement);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const contentType = location.pathname.split('/').pop();
    document.title = `${userId} (u/${userId}) - Readit News`;

    // set contentTypeFilter
    if (contentType === 'story') {
      setContentTypeFilter('story');
    } else if (contentType === 'comment') {
      setContentTypeFilter('comment');
    } else {
      setContentTypeFilter(null);
    }
    
    api.get(`user/${userId}.json`).then((response) => {
      setUser(response.data);
      if (response.data.submitted) {
        setContentIdList(response.data.submitted);
      }
    }).catch((error) => {
      console.log('UserView ' + error);
    }).then(() => {
      setIsLoading(false);
    });
  }, [userId, location]);

  const handleLoadMoreItems = () => {
    if (contentIdList.length > contentCount) {
      setContentCount(contentCount + contentCountIncrement);
    }
  }

  return isLoading ? <UserViewLoader /> : !user ? <UserInvalid /> : ( 
    <div className={styles.userView}>
      <div className={styles.userContent}>
        { contentIdList.length > 0 && 
          <NavigationBar>
            <NavigationItem 
              routeTo={`/u/${userId}`}
              label="Overwview"
              faIcon={faUser}
              title="Show all submissions from this user"
            />
            <NavigationItem 
              routeTo={`/u/${userId}/story`}
              label="Stories"
              faIcon={faNewspaper}
              title="Only show story submissions from this user"
            />
            <NavigationItem 
              routeTo={`/u/${userId}/comment`} 
              label="Comments"
              faIcon={faCommentAlt}
              title="Only show comment submissions from this user"
            />
          </NavigationBar>
        }

        {/* contentItems */}
        { contentIdList.length > 0 && contentIdList.slice(0, contentCount).map((contentId) => 
          <UserContentItem 
            key={contentId}
            contentId={contentId}
            restrictContent={contentTypeFilter}
            userId={userId}
          />
        )}

        {/* load more contentItem */}
        { contentIdList.length > contentCount &&
          <button className={styles.button} onClick={handleLoadMoreItems}>
            Load more content&nbsp;(
            { contentCountIncrement >= contentIdList.length-contentCount 
              ? contentIdList.length-contentCount 
              : contentCountIncrement
              } of {contentIdList.length-contentCount}
            ) 
          </button> 
        }
      </div>

      <div className={styles.sidebar}>
        <div className={styles.userProfile}>
          <header>
            <div className={styles.userIcon}>
              <UserIcon userId={user.id} large />
            </div>
          </header>
          <main>
            <h2 className={styles.userId} title="user id">u/{ user.id }</h2>
            <span className={styles.heading}>Karma</span>
            <span className={styles.heading}>Cake day</span>
            <span className={styles.text} title="user score/karma">
              <FontAwesomeIcon className={styles.textIcon} icon={faStar} />
              { user.karma }
            </span>
            <span className={styles.text} title="user account creation date">
              <FontAwesomeIcon className={styles.textIcon} icon={faBirthdayCake} />
              { moment.unix(user.created).format('LL') }
            </span>
            { user.about && 
              <div className={styles.about}>
                <span className={styles.heading}>About</span>
                <ParsedHtmlText htmlText={user.about} />
              </div>
            }
            <IconButtonLink
              link={"https://news.ycombinator.com/user?id=" + user.id}
              icon={faHackerNewsSquare}
              text="View Original"
              title="View user profile on Hacker News"
              external
              accented
            />
          </main>
        </div>
      </div>
    </div>
  );
}
 
export default UserView;