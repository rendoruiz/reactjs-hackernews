import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import CommentItemGroup from "./CommentItemGroup";
import { generateHslColor } from "../functions/generateHslColor";
import { getMinifiedMomentTime } from "../functions/getMinifiedMomentTime";
import api from '../api';

const CommentItem = ({ commentId, maxCommentDepth, currentCommentDepth, commentData, parentCommentData, userId }) => {
  const [comment, setComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const commentDepth = currentCommentDepth ?? 1;
  const [commentReplyIdList, setCommentReplyIdList] = useState([]);

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
  }, [maxCommentDepth, commentId, commentData, parentCommentData]);

  const handleLoadReplies = () => {
    if (comment.kids) {
      if (comment.kids.length > 0) {
        setCommentReplyIdList(comment.kids);
      }
    }
  }

  return ( 
    !commentId && !commentData ? null : isLoading 
      ? <span className="loader">Loading comment...</span> 
      : !comment ? null : comment.deleted ? null : comment.dead ? null :
        <div className={"comment-item" +  (comment.by === userId ? ' accented-background' : '')}>
          <aside className="comment-expansion">
            { commentData ? null :
              <Link 
                to={"/u/" + comment.by} 
                className="user-avatar"
                style={{backgroundColor: generateHslColor(comment.by)}}
              >
                { comment.by.substring(0, 1) }
              </Link>
            }
            <div className="vertical-toggle"></div>
          </aside>

          <section className="comment-content">
            <header className="comment-header">
              <Link to={"/u/" + comment.by} className="link-btn comment-by">
                { comment.by }
              </Link>
              <span>&nbsp;&#183;&nbsp;</span>
              <span 
                className="comment-time" 
                title={`${moment.unix(comment.time).fromNow()} | ${moment.unix(comment.time).format('LLLL')}`}
              >
                { commentData ? moment.unix(comment.time).fromNow() : getMinifiedMomentTime(moment.unix(comment.time).fromNow()) }
              </span>

              {/* <span>&nbsp;&nbsp;&nbsp;[ID: { comment.id }]</span> */}
            </header>
            <main className="comment-text link-btn">
              { ReactHtmlParser(comment.text.replaceAll(/href/g, `target="_blank" rel="noreferrer" href`)) }
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
  );
}
 
export default CommentItem;
