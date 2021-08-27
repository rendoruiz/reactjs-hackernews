import { faGithub } from '@fortawesome/free-brands-svg-icons';
import IconButtonLink from './Links/IconButtonLink';

import styles from '../styles/components/SiteFooter.module.css';

const SiteFooter = () => {
  return ( 
    <footer className={styles.footer}>
      <IconButtonLink 
        link="https://github.com/rendoruiz/reactjs-hackernews"
        icon={faGithub}
        title="GitHub project link"
        external
        className={styles.button}
      />
      <p className={styles.copyright}>
        @ 2021&nbsp;
        <a href="rendo.ca" target="_blank" rel="noreferrer">Rendo Ruiz</a>
      </p>
    </footer>
  );
}
 
export default SiteFooter;