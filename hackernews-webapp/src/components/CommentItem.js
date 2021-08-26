import { useEffect, useState } from "react";

import api from '../api';
import CommentItemGroup from "./CommentItemGroup";
import CommentLoader from "./Loaders/CommentLoader";
import ConnectionError from "./ConnectionError";
import CommentDeleted from "./Comment/CommentDeleted";
import CommentDead from "./Comment/CommentDead";
import UserIcon from "./User/UserIcon";
import UserViewLink from "./Links/UserViewLink";
import DateTimeContentLink from "./Links/DateTimeContentLink";
import ParsedHtmlText from "./ParsedHtmlText";

const CommentItem = ({ commentId, maxCommentDepth, currentCommentDepth, userId, commentData, parentCommentData }) => {
  const [comment, setComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const commentDepth = currentCommentDepth ?? 1;
  const [commentReplyIdList, setCommentReplyIdList] = useState(null);

  useEffect(() => {
    if (parentCommentData || commentData) {
      setComment(parentCommentData ?? commentData);
      setIsLoading(false);
    } else {
      // setTimeout(() => {
        api.get(`item/${commentId}.json`).then((res) => {
          setComment(res.data);
        }).catch((error) => {
          console.log('CommentItem ' + error);
        }).then(() => {
          setIsLoading(false);
        });
      // }, 1000);
    }
  }, [commentId, commentData, parentCommentData]);

  const handleLoadReplies = () => {
    if (comment.kids) {
      if (comment.kids.length > 0) {
        setCommentReplyIdList(comment.kids);
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
            <DateTimeContentLink contentTime={comment.time} minified />
          </header>
          <main className="comment-text link-btn">
            <ParsedHtmlText htmlText={comment.text} />
          </main>
          { commentData
            ? (parentCommentData && <CommentItem commentData={commentData} userId={userId} />)
            : <div className="comment-replies">
                {
                  comment.kids && commentDepth < maxCommentDepth
                    ? <CommentItemGroup 
                        commentItemIdList={comment.kids} 
                        maxCommentDepth={maxCommentDepth} 
                        currentCommentDepth={commentDepth + 1}
                      /> 
                    : comment.kids && commentReplyIdList.length === 0 &&
                      <button onClick={handleLoadReplies} className="link-btn more-items">Load more replies ({comment.kids.length})</button>
                }
                {
                  commentReplyIdList &&
                    <CommentItemGroup 
                      commentItemIdList={commentReplyIdList} 
                      maxCommentDepth={1} 
                    /> 
                }
              </div>
          }
        </section>
      </div>
    )
  );
}
 
export default CommentItem;
