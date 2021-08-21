import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faNewspaper, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import UserContentItem from '../components/UserContentItem';
import { generateHslColor } from '../functions/generateHslColor';
import { faHackerNewsSquare } from '@fortawesome/free-brands-svg-icons';
import api from '../api';
import NavigationItem from '../components/NavigationItem';

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
    
    api.get(`user/${userId}.json`).then((res) => {
      if (res.data) {
        setUser(res.data);
        if (res.data.submitted) {
          setContentIdList(res.data.submitted);
        }
      }
      setIsLoading(false);
    });
  }, [userId, location]);

  const handleLoadMoreItems = () => {
    if (contentIdList.length > contentCount) {
      setContentCount(contentCount + contentCountIncrement);
    }
  }

  return isLoading ? <span>Loading User...</span> : !user ? <span>User does not exist</span> : ( 
    <div className="page user-detail">
      <aside className="user-contents">
        { contentIdList.length > 0 && 
          <nav className="navigation-group">
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
          </nav> 
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
          <button className="btn more-items" onClick={handleLoadMoreItems}>
            <span>Load more content </span> 
            <span>
              ({contentCountIncrement >= contentIdList.length-contentCount 
                ? contentIdList.length-contentCount 
                : contentCountIncrement
                } of {contentIdList.length-contentCount})
            </span>  
          </button> 
        }
      </aside>

      <section className="sidebar">
        { user && (
          <div className="user-profile">
            <header>
              <div className="user-image" title="App-Generated profile image based on user's ID">
                <div style={{backgroundColor: generateHslColor(user.id)}}>
                  { user.id ? user.id.substring(0, 1) : '' }
                </div>
              </div>
            </header>
            <main>
              <h2 className="user-heading" title="User name">u/{ user.id }</h2>
              <div className="user-info-group" title="User score/karma">
                <span className="info-label">Karma</span>
                <span><FontAwesomeIcon className="inline-glyph" icon={faStar} /> { user.karma }</span>
              </div>
              <div className="user-info-group">
                <span className="info-label" title="User account creation date">Cake day</span>
                <span><FontAwesomeIcon className="inline-glyph" icon={faBirthdayCake} /> { moment.unix(user.created).format('LL') }</span>
              </div>
              <a 
                className="btn more-items user-original-link"
                href={'https://news.ycombinator.com/user?id=' + user.id}
                target="_blank" rel="noreferrer"
                title="View user profile on Hacker News"
              >
                <FontAwesomeIcon className="glyph" icon={faHackerNewsSquare} />
                View Original
              </a>
            </main>
          </div>
        )}
      </section>
    </div>
  );
}
 
export default UserView;