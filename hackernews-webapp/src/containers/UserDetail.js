import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { getUserData } from '../api';

const UserDetail = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    document.title = `${userId} - User Details`;
    getUserData(userId).then((data) => {
      setUser(data);
    });
  }, [user])

  return ( 
    <div className="user-detail">
      <h2>{ userId }</h2>
      { user && (
        <div className="user-content">
          <span>id:</span>
          <span>{ user.id }</span>
          <span>created:</span>
          <span>{ moment.unix(user.created).format('llll') }</span>
          <span>karma:</span>
          <span>{ user.karma }</span>
          <span>about:</span>
          <span>{ user.about }</span>
          <span>submitted:</span>
          <span>{ JSON.stringify(user.submitted) }</span>
        </div>
      )}
    </div>
  );
}
 
export default UserDetail;