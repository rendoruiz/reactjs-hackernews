import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import api from '../api';
import CommentItem from "./CommentItem";


const CommentCard = ({ commentData, userId }) => {
  const [parentStory, setParentStory] = useState(null);
  const [parentComment, setParentComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!parentStory) {
      const getParentReferences = (commentId) => {
        api.get(`item/${commentId}.json`).then((response) => {
          const data = response.data;
          // set comment parent story (mandatory)
          if (!parentStory && data.type === 'story') {
            setParentStory(data);
            setIsLoading(false);
            return;
          }
          // set comment parent comment reference (optional)
          // cannot be the same as parentStory (i.e., redundant duplicate)
          // dead or deleted parent comment will not be rendered
          if (!parentStory && !parentComment && 
            commentData.parent === data.id && data.type === 'comment'
            && !data.deleted && !data.dead) {
            setParentComment(data);
          }
          // recurse function until a story object is found
          if (!parentStory) {
            getParentReferences(data.parent);
          }
        }).catch((error) => {
          console.log('CommentCard ' + error);
        });
      }
      getParentReferences(commentData.parent);
    }
  }, [commentData, parentStory, parentComment]);

  const minifyUrl = (url) => {
    return url.replace(/(^\w+:|^)\/\//, '').replace('www.', '').substring(0, 25) + '...';
  }

  return ( 
    !commentData ? null : commentData.deleted ? null : commentData.dead ? null :  
      <div className="content-card comment-card">
        <section className="comment-parent-story">
          <FontAwesomeIcon className="glyph" icon={faCommentAlt} />
          { !parentStory && <span>Loading parent story</span> }
          { parentStory && 
            <div className="parent-story-content">
              <Link
                to={"/u/" + commentData.by} 
                className="link-btn accented-link"
                title="Open user page"
              >
                { commentData.by }
              </Link>
              <span>&nbsp;commented on&nbsp;</span>
              <Link
                to={"/s/" + parentStory.id} 
                className="link-btn"
                title="Open story"
              >
                { parentStory.title }
              </Link>
              <span>&nbsp;</span>
              { parentStory.url &&
                <a 
                  className="story-url link-btn accented-link" 
                  href={parentStory.url} 
                  target="_blank"
                  rel="noreferrer"
                  title={parentStory.url}
                >
                  { parentStory.url && <span>{ minifyUrl(parentStory.url) }</span> }
                  { parentStory.url && <FontAwesomeIcon className="inline-glyph" icon={faExternalLinkAlt} /> }
                </a>
              }
              <span>&nbsp;<b>&#183;</b> Posted by&nbsp;</span>
              <Link
                to={"/u/" + parentStory.by} 
                className="link-btn parent-story-by"
                title="Open user page"
              >
                u/{ parentStory.by }
              </Link>
            </div> 
          }
        </section>

        <section className="comment-content">
          { isLoading ? <span>Loading comment...</span> : parentComment
            ? <CommentItem commentObject={commentData} parentCommentObject={parentComment} userId={userId} />
            : <CommentItem commentObject={commentData} userId={userId} /> 
          }
        </section>
      </div>
  );
}
 
export default CommentCard;