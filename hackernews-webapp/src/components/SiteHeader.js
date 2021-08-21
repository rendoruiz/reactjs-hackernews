import { useHistory } from 'react-router';
import styles from '../styles/SiteHeader.module.css'
import logo from '../images/logo30.png'

const SiteHeader = () => {
  const history = useHistory();

  const handleOnClick = () => {
    history.replace('/');
  }

  return ( 
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="" />
        <span className={styles.logoText} onClick={handleOnClick}>Readit News</span>
      </div>
    </header> 
  );
}
 
export default SiteHeader;