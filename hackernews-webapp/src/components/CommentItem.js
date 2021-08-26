import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";

import api from '../api';
import CommentLoader from "./Loaders/CommentLoader";
import ConnectionError from "./ConnectionError";
import CommentDeleted from "./Comment/CommentDeleted";
import CommentDead from "./Comment/CommentDead";
import UserIcon from "./User/UserIcon";
import UserViewLink from "./Links/UserViewLink";
import DateTimeContentLink from "./Links/DateTimeContentLink";
import ParsedHtmlText from "./ParsedHtmlText";

import styles from '../styles/components/CommentItem.module.css'

// commentId, maxCommentDepth, currentCommentDepth - used by CommentItemGroup
// userId, commentData, parentCommentData - are used by CommentCard
const CommentItem = ({ commentId, maxCommentDepth, currentCommentDepth, userId, commentData, parentCommentData }) => {
  const commentDepth = currentCommentDepth ?? 1;
  const [comment, setComment] = useState(parentCommentData ?? commentData ?? null);
  const [isLoading, setIsLoading] = useState((parentCommentData || commentData) ? false : true);
  const [commentChildrenList, setCommentChildrenList] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (commentId) {
      api.get(`item/${commentId}.json`).then((response) => {
        setComment(response.data);
      }).catch((error) => {
        console.log('CommentItem ' + error);
      }).then(() => {
        setIsLoading(false);
      });
    }
  }, [commentId]);

  const handleLoadReplies = () => {
    if (comment.kids) {
      if (comment.kids.length > 0) {
        setCommentChildrenList(comment.kids);
      }
    }
  }

  const generateChildren = () => {
    // render commentData once parentCommentData has been rendered
    // else if - render children (1 depth) when load more replies button is selected
    // else if - render comments until maxDepth is reached
    if (commentData && parentCommentData) {
      return (
        <CommentItem 
          userId={userId} 
          commentData={commentData}
        />
      )
    } 
    else if (commentChildrenList) {
      return commentChildrenList.map((id) => (
        <CommentItem 
          key={id} 
          commentId={id} 
          maxCommentDepth={1} 
        />)
      ) 
    }
    else if (!commentData && comment.kids) {
      // auto render until maxCommentDepth is reached
      if (commentDepth < maxCommentDepth) {
        return comment.kids.map((id) => (
          <CommentItem 
            key={id} 
            commentId={id} 
            currentCommentDepth={commentDepth + 1} 
            maxCommentDepth={maxCommentDepth} 
          />)
        )
      } else {
        return (
          <button 
            onClick={handleLoadReplies} 
            className={styles.linkButton}
          >
            Load more replies ({comment.kids.length})
          </button>
        )
      }
    }
  }

  const handleSetisMinimized = () => {
    setIsMinimized(!isMinimized);
  }

  return ( 
    (!commentId && !commentData) ? null : isLoading ? <CommentLoader /> : !comment ? <ConnectionError /> : comment.deleted ? <CommentDeleted /> : comment.dead ? <CommentDead /> : (
      <div className={!isMinimized ? styles.comment : styles.commentMinimized}>
        <aside className={styles.sidePanel}>
          <FontAwesomeIcon icon={faExpandAlt} className={styles.maximizeToggle} onClick={!commentData ? handleSetisMinimized : null}  />
          <UserIcon userId={comment.by} />
          <div 
            className={styles.minimizeToggle}
            onClick={!commentData ? handleSetisMinimized : null} 
          />
        </aside>

        <section className={(comment.by === userId) ? styles.accentedContent : styles.content}>
          <header>
            <UserViewLink 
              userId={comment.by} 
              isText 
            />
            &nbsp;&#183;&nbsp;
            <DateTimeContentLink 
              contentTime={comment.time} 
              readonly 
            />
          </header>
          <main 
            className={styles.contentBody}
          >
            <ParsedHtmlText htmlText={comment.text} />
            <div className={styles.children}>
              { generateChildren() }
            </div>
          </main>
        </section>
      </div>
    )
  );
}
 
export default CommentItem;