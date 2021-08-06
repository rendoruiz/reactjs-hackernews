import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faNewspaper, faStar, faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { getUserData } from '../functions/hackernewsApi';
import UserContentItem from '../components/UserContentItem';
import { generateHslColor } from '../functions/generateHslColor';


const UserDetailView = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [contentIdList, setContentIdList] = useState([]);
  const contentCountIncrement = 10;
  const [contentCount, setContentCount] = useState(contentCountIncrement);

  useEffect(() => {
    document.title = `${userId} (u/${userId}) - Readit News`;

    getUserData(userId).then((data) => {
      setUser(data);
      if (data.submitted) {
        setContentIdList(data.submitted.slice(0, contentCountIncrement));
      }
    });
  }, [userId]);

  return ( 
    <div className="page user-detail">
      <aside className="user-contents">
        { contentIdList.length > 0 && 
          <header>
            <span className="btn"><FontAwesomeIcon icon={faUser} className="glyph" /><span>Overview</span></span>
            <span className="btn"><FontAwesomeIcon icon={faNewspaper} className="glyph" /><span>Posts</span></span>
            <span className="btn"><FontAwesomeIcon icon={faCommentAlt} className="glyph" /><span>Comments</span></span>
          </header> 
        }
        { contentIdList.length > 0 && contentIdList.map((contentId) => 
          <UserContentItem 
            contentId={contentId}
          />
        )}
      </aside>

      <section className="sidebar">
        { user && (
          <div className="user-profile">
            <header>
              <div className="user-image">
                <div style={{backgroundColor: generateHslColor(user.id)}}>
                  { user.id ? user.id.substring(0, 1) : '' }
                </div>
              </div>
            </header>
            <main>
              <h2 className="user-heading">u/{ user.id }</h2>
              <div className="user-info-group">
                <span className="info-label">Karma</span>
                <span><FontAwesomeIcon className="inline-glyph" icon={faStar} /> { user.karma }</span>
              </div>
              <div className="user-info-group">
                <span className="info-label">Cake day</span>
                <span><FontAwesomeIcon className="inline-glyph" icon={faBirthdayCake} /> { moment.unix(user.created).format('LL') }</span>
              </div>
            </main>
          </div>
        )}
      </section>
    </div>
  );
}
 
export default UserDetailView;