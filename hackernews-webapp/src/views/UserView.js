import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faNewspaper, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import UserContentItem from '../components/UserContentItem';
import { generateHslColor } from '../functions/generateHslColor';
import { faHackerNewsSquare } from '@fortawesome/free-brands-svg-icons';
import api from '../api';

const UserView = () => {
  const history = useHistory();
  const { userId, contentType } = useParams();
  const [user, setUser] = useState(null);
  const [contentIdList, setContentIdList] = useState([]);
  const [contentTypeFilter, setContentTypeFilter] = useState(null);
  const contentCountIncrement = 10;
  const [contentCount, setContentCount] = useState(contentCountIncrement);

  useEffect(() => {
    document.title = `${userId} (u/${userId}) - Readit News`;

    // set contentTypeFilter, redirect to same url without params if does not match
    if (contentType === 'story') {
      setContentTypeFilter('story');
    } else if (contentType === 'comment') {
      setContentTypeFilter('comment');
    } else if (contentType) {
      history.push(`/u/${userId}`);
    } else {
      setContentTypeFilter(null);
    }
    
    api.get(`user/${userId}.json`).then((res) => {
      setUser(res.data);
      if (res.data.submitted) {
        setContentIdList(res.data.submitted);
      }
    });
  }, [userId, contentType, history]);


  const setActiveButton = (type) => {
    if (type === contentTypeFilter || (type === 'overview' && !contentTypeFilter)) {
      return ' active';
    }
  }

  const handleLoadMoreItems = () => {
    if (contentIdList.length > contentCount) {
      setContentCount(contentCount + contentCountIncrement);
    }
  }

  return ( 
    <div className="page user-detail">
      <aside className="user-contents">
        { contentIdList.length > 0 && 
          <header className="navigation-group">
            <Link 
              className={`navigation-item ` + setActiveButton('overview')}
              to={`/u/${userId}`}
              title="Show all submissions from this user"
            >
              <FontAwesomeIcon icon={faUser} className="glyph" />
              <span>Overview</span>
            </Link>
            <Link 
              className={`navigation-item ` + setActiveButton('story')}
              to={`/u/${userId}/story`}
              title="Only show story submissions from this user"
            >
              <FontAwesomeIcon icon={faNewspaper} className="glyph" />
            <span>Stories</span>
            </Link>
            <Link 
              className={`navigation-item ` + setActiveButton('comment')}
              to={`/u/${userId}/comment`}
              title="Only show comment submissions from this user"
            >
              <FontAwesomeIcon icon={faCommentAlt} className="glyph" />
              <span>Comments</span>
            </Link>
          </header> 
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