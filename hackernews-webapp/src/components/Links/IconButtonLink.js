import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IconButtonLink = ({ link, icon, text, title, external = false }) => {
  const externalLinkAttributes = !external ? null : {target: "_blank", rel: "noreferrer"}

  return ( 
    <Link
      to={{pathname: link}}
      title={title}
      
      {...externalLinkAttributes}
    >
      <FontAwesomeIcon icon={icon} />
      { text ?? <span>{ text }</span> }
    </Link>
  );
}
 
export default IconButtonLink;