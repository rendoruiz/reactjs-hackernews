import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const ExternalUrlLink = ({ externalUrl, text = null, title = null }) => {
  return !externalUrl ? null : ( 
    <a href={externalUrl} target="_blank" rel="noreferrer" 
      className="btn story-url-btn" 
      title={title ? title : "View link in new tab"}
    >
      { text && <span>{ text }</span> }
      <FontAwesomeIcon className="glyph" icon={faExternalLinkAlt} />
    </a>
  );
}
 
export default ExternalUrlLink;