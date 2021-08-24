import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import api from '../api';
import CommentItem from "./CommentItem";
import UserViewLink from "./Links/UserViewLink";

import styles from '../styles/components/CommentCard.module.css'
import StoryViewLink from "./Links/StoryViewLink";
import ExternalLink from "./Links/ExternalLink";

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

  return ( 
    !commentData ? null : commentData.deleted ? null : commentData.dead ? null :  
      <div className="content-card comment-card">
        <header className="comment-parent-story">
          <FontAwesomeIcon className="glyph" icon={faCommentAlt} />
          { !parentStory && <span>Loading parent story</span> }
          { parentStory && 
            <div className="parent-story-content">
              <UserViewLink 
                userId={commentData.by} 
                isText 
                className={styles.storyUser} 
              />
              &nbsp;commented on&nbsp;
              <StoryViewLink 
                storyId={parentStory.id} 
                text={parentStory.title} 
                className={styles.storyTitle} 
              />
              &nbsp;
              <ExternalLink 
                link={parentStory.url}
                text={parentStory.url}
              />
              &nbsp;<b>&#183;</b> Posted by&nbsp;
              <UserViewLink 
                userId={parentStory.by}
              />
            </div> 
          }
        </header>

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