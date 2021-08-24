import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IconButtonLink = ({ link, icon, text = null, title, external = false, className = "", iconClassName = "" }) => {
  const externalLinkAttributes = !external ? null : {target: "_blank", rel: "noreferrer"}

  return (!link || !icon) ? null : ( 
    <Link
      to={{pathname: link}}
      title={title}
      {...externalLinkAttributes}
      className={className}
    >
      <FontAwesomeIcon icon={icon} className={iconClassName} />
      { text }
    </Link>
  );
}
 
export default IconButtonLink;