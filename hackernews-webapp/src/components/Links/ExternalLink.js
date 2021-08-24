import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import styles from '../../styles/ExternalLink.module.css'

const ExternalLink = ({ link, text, title, className, iconClassName }) => {
  const minifyUrl = (url) => {
    if (url) {
      return url.replace(/(^\w+:|^)\/\//, '').replace('www.', '').substring(0, 25) + '...';
    }
  }

  return !link ? null : ( 
    <a href={link} target="_blank" rel="noreferrer" 
      title={title ? title : link}
      className={className ?? styles.link} 
    >
      { minifyUrl(text) }
      <FontAwesomeIcon className={iconClassName ?? styles.linkIcon} icon={faExternalLinkAlt} />
    </a>
  );
}
 
export default ExternalLink;