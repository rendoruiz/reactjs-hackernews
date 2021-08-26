import { useEffect, useState } from "react";

import api from '../api';
import CommentLoader from "./Loaders/CommentLoader";
import ConnectionError from "./ConnectionError";
import CommentDeleted from "./Comment/CommentDeleted";
import CommentDead from "./Comment/CommentDead";
import UserIcon from "./User/UserIcon";
import UserViewLink from "./Links/UserViewLink";
import DateTimeContentLink from "./Links/DateTimeContentLink";
import ParsedHtmlText from "./ParsedHtmlText";

// commentId, maxCommentDepth, currentCommentDepth - used by CommentItemGroup
// userId, commentData, parentCommentData - are used by CommentCard
const CommentItem = ({ commentId, maxCommentDepth, currentCommentDepth, userId, commentData, parentCommentData }) => {
  const commentDepth = currentCommentDepth ?? 1;
  const [comment, setComment] = useState(parentCommentData ?? commentData ?? null);
  const [isLoading, setIsLoading] = useState((parentCommentData || commentData) ? false : true);
  const [commentChildrenList, setCommentChildrenList] = useState(null);

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
            className="link-btn more-items"
          >
            Load more replies ({comment.kids.length})
          </button>
        )
      }
    }
  }

  return ( 
    (!commentId && !commentData) ? null : isLoading ? <CommentLoader /> : !comment ? <ConnectionError /> : comment.deleted ? <CommentDeleted /> : comment.dead ? <CommentDead /> : (
      <div className={"comment-item" +  (comment.by === userId ? ' accented-background' : '')}>
        <aside className="comment-expansion">
          <UserIcon userId={comment.by} />
          <div className="vertical-toggle"></div>
        </aside>

        <section className="comment-content">
          <header className="comment-header">
            <UserViewLink userId={comment.by} isText />
            &nbsp;&#183;&nbsp;
            <DateTimeContentLink contentTime={comment.time} readonly />
          </header>
          <main className="comment-text link-btn">
            <ParsedHtmlText htmlText={comment.text} />
          </main>
          <footer>
            { generateChildren() }
          </footer>
        </section>
      </div>
    )
  );
}
 
export default CommentItem;