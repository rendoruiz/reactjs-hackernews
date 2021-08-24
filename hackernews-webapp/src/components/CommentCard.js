import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import CommentItem from "./CommentItem";
import api from '../api';

const CommentCard = ({ comment = null, userId = null }) => {
  const [parentStory, setParentStory] = useState(null);
  const [parentComment, setParentComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!parentStory) {
      // console.log('getParentReferences')
      const getParentReferences = (commentId) => {
        // setTimeout(() => {
          api.get(`item/${commentId}.json`).then((res) => {
            // set comment parent story (mandatory)
            if (!parentStory && res.data.type === 'story') {
              setParentStory(res.data);
              setIsLoading(false);
              return;
            }
            // set comment parent comment reference (optional)
            // cannot be the same as parentStory (i.e., redundant duplicate)
            // dead or deleted parent comment will not be rendered
            if (!parentStory && !parentComment && 
              comment.parent === res.data.id && res.data.type === 'comment'
              && !res.data.deleted && !res.data.dead) {
              setParentComment(res.data);
            }
            // recurse function until a story object is found
            if (!parentStory) {
              getParentReferences(res.data.parent);
            }
          }).catch((error) => {
            console.log('CommentCard ' + error);
          });
        // }, 1000);
      }
      getParentReferences(comment.parent);
    }
  }, [comment, parentStory, parentComment]);

  const minifyUrl = (url) => {
    return url.replace(/(^\w+:|^)\/\//, '').replace('www.', '').substring(0, 25) + '...';
  }

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
                className="link-btn accented-link"
                title="Open user page"
              >
                { comment.by }
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
          {/* <div>
            <h3>Comment Parent</h3>
            { parentComment && <p>{ parentComment.by } { parentComment.id } <span>[{ parentComment.kids.join(', ') }]</span></p> }
            <p>{ parentComment && JSON.stringify(parentComment) }</p>
            <div>
              <h3>Comment</h3>
              <p>{ comment.by } <span>{ comment.id }</span></p>
              <p>{ JSON.stringify(comment) }</p>
            </div>
          </div> */}
          { isLoading ? <span>Loading comment...</span> : parentComment
            ? <CommentItem commentObject={comment} parentCommentObject={parentComment} userId={userId} />
            : <CommentItem commentObject={comment} userId={userId} /> 
          }
        </section>
      </div>
  );
}
 
export default CommentCard;