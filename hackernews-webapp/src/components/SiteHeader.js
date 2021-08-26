import { Link } from 'react-router-dom';
import styles from '../styles/components/SiteHeader.module.css'
import logo from '../images/logo30.png'

const SiteHeader = () => {
  return ( 
    <header className={styles.header}>
      <Link to="/" replace className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="Readit News logo" />
        <span className={styles.logoText}>Readit News</span>
      </Link>
    </header> 
  );
}
 
export default SiteHeader;