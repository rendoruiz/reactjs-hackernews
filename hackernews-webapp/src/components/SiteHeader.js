import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import IconButtonLink from './Links/IconButtonLink';
import logo from '../images/logo30.png'

import styles from '../styles/components/SiteHeader.module.css'

const SiteHeader = () => {
  return ( 
    <header className={styles.header}>
      <Link to="/" replace className={styles.logo}>
        <img className={styles.logoImage} src={logo} alt="Readit News logo" />
        <span className={styles.logoText}>Readit News</span>
      </Link>
      <IconButtonLink 
        link="https://github.com/rendoruiz/reactjs-hackernews"
        icon={faGithub}
        title="GitHub project link"
        external
        className={styles.button}
        iconClassName={styles.buttonIcon}
      />
    </header> 
  );
}
 
export default SiteHeader;