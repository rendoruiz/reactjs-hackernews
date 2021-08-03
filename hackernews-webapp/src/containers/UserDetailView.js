import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { getUserData } from '../functions/hackernewsApi';

import ContentGroup from "../components/ContentGroup";

const UserDetailView = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState({});
  const [contentItemCount, setContentItemCount] = useState(10);
  const [itemIdList, setItemIdList] = useState([]);

  useEffect(() => {
    document.title = `${userId} - User Details`;
    getUserData(userId).then((data) => {
      setUser(data);
      setItemIdList(data.submitted);
    });
  }, [userId, contentItemCount]);

  return ( 
    <div className="page user-detail">
      <aside className="stories">
        {/* <span>{ JSON.stringify(user.submitted) }</span> */}
        {/* if userstories */}
        { itemIdList && <ContentGroup customItemIdList={itemIdList} itemCount={contentItemCount} setItemCount={setContentItemCount} /> }
      </aside>
      <section className="sidebar">
        { user && (
          <div className="user-content">
            <header>
              <h2 className="user-heading">{ user.id }</h2>
              <div className="user-subtitle">
                <span>{ `u/${user.id}` }</span>
                <span>&nbsp;&#183;&nbsp;</span>
                <span>{ moment.unix(user.created).fromNow().replace(' years ago', 'y') }</span>
              </div>
            </header>
            <div className="user-info-group">
              <span className="info-label">Karma</span>
              <span><FontAwesomeIcon className="inline-glyph" icon={faStar} /> { user.karma }</span>
            </div>
            <div className="user-info-group">
              <span className="info-label">Cake day</span>
              <span><FontAwesomeIcon className="inline-glyph" icon={faBirthdayCake} /> { moment.unix(user.created).format('LL') }</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
 
export default UserDetailView;