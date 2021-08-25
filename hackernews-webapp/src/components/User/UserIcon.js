import { Link } from 'react-router-dom';

import styles from '../../styles/components/UserIcon.module.css'

const UserIcon = ({ userId, large = false }) => {
  // https://stackoverflow.com/a/49562686
  const getHashCode = (str) => {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  const generateHslColor = (str) => {
    if (str) {
      return `hsl(${getHashCode(str) % 360}, 100%, 80%)`;
    }
    return false;
  }

  return !userId ? null : ( 
    <Link 
      to={"/u/" + userId}
      title="View user profile"
      className={!large ? styles.icon : styles.largeIcon}
      style={{backgroundColor: generateHslColor(userId)}}
    >
      { userId.substring(0, 1) }
    </Link>
  );
}
 
export default UserIcon;