import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from '../../styles/components/Button.module.css'

const IconButtonLink = ({ link, icon, text, title, external = false, accented, className, iconClassName }) => {
  const externalLinkAttributes = !external ? null : {target: "_blank", rel: "noreferrer"}

  return (!link || !icon) ? null : ( 
    <Link
      to={{pathname: link}}
      title={title}
      {...externalLinkAttributes}
      className={accented ? styles.accentedButton : className ?? styles.button}
    >
      <FontAwesomeIcon icon={icon} className={iconClassName ?? styles.buttonIcon} />
      { text }
    </Link>
  );
}
 
export default IconButtonLink;