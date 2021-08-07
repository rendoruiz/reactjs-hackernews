import { useEffect, useState } from "react";
import { getItemData } from "../functions/hackernewsApi";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import CommentItem from "./CommentItem";

const ContentItemCommentCard = ({ comment = null }) => {
  const [parentStory, setParentStory] = useState(null);
  const [parentComment, setParentComment] = useState(null);

  useEffect(() => {
    if (!parentStory) {
      console.log('getParentReferences')
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
      getParentReferences(comment.parent);
    }
  }, [comment, parentStory, parentComment]);

  return ( 
    !comment ? null : comment.deleted ? null : comment.dead ? null :  
      <div className="content-card comment-card">
        <section className="comment-parent-story">
          <FontAwesomeIcon className="glyph" icon={faCommentAlt} />
          { !parentStory && <span>Loading parent story</span> }
          { parentStory && 
            <div className="parent-story-content">
              <Link
                to={"/u/" + comment.by} 
                className="link-btn"
                title="Open user page"
              >
                { comment.by }
              </Link>
              <span>&nbsp;commented on&nbsp;</span>
              <Link
                to={"/s/" + parentStory.id} 
                className="link-btn"
                title="Open user page"
              >
                { parentStory.title }
              </Link>
              { parentStory.url &&
                <a 
                  className="story-url link-btn" 
                  href={parentStory.url} 
                  target="_blank"
                  rel="noreferrer"
                  title={parentStory.url}
                >
                  { parentStory.url && <span>{ parentStory.url }</span> }
                  { parentStory.url && <FontAwesomeIcon className="inline-glyph" icon={faExternalLinkAlt} /> }
                </a>
              }
              <span>&nbsp;&#183; Posted by&nbsp;</span>
              <Link
                to={"/u/" + parentStory.by} 
                className="link-btn"
                title="Open user page"
              >
                u/{ parentStory.by }
              </Link>
            </div> 
          }
        </section>

        <section className="comment-content">
          { parentComment 
            ? <CommentItem commentObject={comment} parentCommentObject={parentComment} /> 
            : <CommentItem commentObject={comment} /> 
          }
        </section>
      </div>
  );
}
 
export default ContentItemCommentCard;