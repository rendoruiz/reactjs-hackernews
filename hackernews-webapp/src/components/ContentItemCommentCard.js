import { useEffect, useState } from "react";
import { getItemData } from "../functions/hackernewsApi";
import { Link } from 'react-router-dom';

const ContentItemCommentCard = ({ comment = null }) => {
  const [parentStory, setParentStory] = useState(null);
  const [parentComment, setParentComment] = useState(null);

  const getParentReferences = (commentId) => {
    setTimeout(() => {
      getItemData(commentId).then((data) => {
        if (data) {
          // set comment parent story (mandatory)
          if (!parentStory && data.type === 'story') {
            setParentStory(data);
            return;
          }
          // set comment parent comment reference (optional)
          // cannot be the same as parentStory (i.e., redundant duplicate)
          if (!parentStory && !parentComment && 
            comment.parent === data.id && data.type === 'comment') {
            setParentComment(data);
          }
          // recurse function until a story object is found
          if (!parentStory) {
            getParentReferences(data.parent);
          }
        }
      });
    }, 1000);
  }

  useEffect(() => {
    if (!parentStory) {
      console.log('getParentReferences')
      getParentReferences(comment.parent);
    }
    console.log('useeffect')
  }, [comment]);

  return ( 
    !comment ? null : comment.deleted ? null : comment.dead ? null :  
      <div className="content-card comment-card">
        <section className="comment-parent-story">
            <h3>Parent Story</h3>
          { !parentStory && <span>Loading parent story</span> }
          { parentStory && 
            <div className="parent-story-content">
              <Link
                to={"/u/" + parentStory.by} 
                className="link-btn"
                title="Open user page"
              >
                { parentStory.by }
              </Link>
              <span> commented on </span>
              <Link
                to={"/s/" + parentStory.id} 
                className="link-btn"
                title="Open user page"
              >
                { parentStory.title }
              </Link>
            </div> 
          }
        </section>

        <section className="comment-content">
          <div>
            <h3>Comment Parent</h3>
            { !parentComment && <span>Loading parent comment</span> }
            { parentComment && <p>{ JSON.stringify(parentComment) }</p> }
            <div>
              <h3>Comment</h3>
              <p>{ JSON.stringify(comment) }</p>
            </div>
          </div>
        </section>
      </div>
  );
}
 
export default ContentItemCommentCard;