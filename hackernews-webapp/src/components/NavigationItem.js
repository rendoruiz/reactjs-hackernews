import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import styles from '../styles/components/NavigationItem.module.css'

const NavigationItem = ({ routeTo, label, faIcon = null, title }) => {
  const location = useLocation();

  const setActive = () => {
    return location.pathname === routeTo
      ? ` ${styles.active}`
      : '';
  }

  return ( 
    <Link 
      to={routeTo}
      title={title}
      className={styles.navigationItem + setActive()}
    >
      <FontAwesomeIcon icon={faIcon} className={styles.glyph} />
      <span>{ label }</span>
    </Link>
  );
}
 
export default NavigationItem;