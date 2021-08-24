import { Link } from "react-router-dom";

const StoryViewLink = ({ storyId, text, className }) => {
  return (!storyId || !text) ? null : ( 
    <Link
      to={"/s/" + storyId}
      title="View story"
      className={className}
    >
      { text}
    </Link>
  );
}
 
export default StoryViewLink;