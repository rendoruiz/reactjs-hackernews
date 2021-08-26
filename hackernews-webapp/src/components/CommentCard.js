import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import api from '../api';
import CommentItem from "./CommentItem";
import UserViewLink from "./Links/UserViewLink";
import StoryViewLink from "./Links/StoryViewLink";
import ExternalLink from "./Links/ExternalLink";
import CommentLoader from "./Loaders/CommentLoader";
import CommentDeleted from "./Comment/CommentDeleted";
import CommentDead from "./Comment/CommentDead";
import StoryLoader from "./Loaders/StoryLoader";

import styles from '../styles/components/CommentCard.module.css'

const CommentCard = ({ commentData, userId }) => {
  const [parentStory, setParentStory] = useState(null);
  const [parentComment, setParentComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!parentStory) {
      const getParentReferences = (commentId) => {
        api.get(`item/${commentId}.json`).then((response) => {
          const data = response.data;
          // set parent story (required)
          if (!parentStory && data.type !== 'comment') {
            setParentStory(data);
            setIsLoading(false);
            return;
          }
          // set parent comment (optional)
          // must not be the same as parent story (i.e., redundant duplicate)
          // dead or deleted parent comment will not be rendered
          if (!parentStory && !parentComment && 
            commentData.parent === data.id && data.type === 'comment'
            && !data.deleted && !data.dead) {
            setParentComment(data);
          }
          // recurse function until a parent story object is found
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
    !commentData ? null : commentData.deleted ? <CommentDeleted /> : commentData.dead ? <CommentDead /> : (
      <div className={styles.commentCard}>
        <header className={styles.header}>
          { !parentStory ? <StoryLoader /> : <>
            <FontAwesomeIcon className={styles.storyIcon} icon={faCommentAlt} />
            <div className={styles.storyContent}>
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
              &nbsp;&nbsp;&nbsp;
              <ExternalLink 
                link={parentStory.url}
                text={parentStory.url}
              />
              &nbsp;<b>&#183;</b> Posted by&nbsp;
              <UserViewLink userId={parentStory.by} />
            </div> 
          </>}
        </header>

        { isLoading ? <CommentLoader /> : 
          <CommentItem 
            userId={userId} 
            commentData={commentData} 
            parentCommentData={parentComment} 
          /> 
        }
      </div>
    )
  );
}
 
export default CommentCard;