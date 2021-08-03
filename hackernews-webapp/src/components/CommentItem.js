import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItemData } from './../api';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import CommentItemGroup from "./CommentItemGroup";

const CommentItem = ({ id, maxCommentDepth, currentCommentDepth }) => {
  const [comment, setComment] = useState({kids: []});
  const [isLoading, setIsLoading] = useState(true);
  const commentDepth = currentCommentDepth ?? 1;

  useEffect(() => {
    setTimeout(() => {
      getItemData(id).then((data) => {
        if (data) {
          setComment(data);
          setIsLoading(false);
        }
      })
    }, 1000);

    console.log('useeffect commentitem');
  }, [maxCommentDepth]);

  // https://stackoverflow.com/a/49562686
  const getHashCode = (str) => {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  const pickColor = (str) => {
    if (str) {
      return `hsl(${getHashCode(str) % 360}, 100%, 80%)`;
    }
    return false;
  }

  return ( 
    !isLoading 
      ? comment.by && !comment.deleted && 
        <div className="comment-item">
          <aside className="comment-expansion">
            <Link 
              to={"/u/" + comment.by} 
              className="user-avatar"
              style={{backgroundColor: pickColor(comment.by)}}
            >
              { comment.by ? comment.by.substring(0, 1) : '' }
            </Link>
            {/* <span style={{backgroundColor: pickColor(comment.by)}}>{ comment.by.substring(0, 1) }</span> */}
            <div></div>
          </aside>

          <section className="comment-content">
            <header className="comment-header">
              <Link to={"/u/" + comment.by} className="link-btn comment-by">
                { comment.by }
              </Link>
              <span>&nbsp;&#183;&nbsp;</span>
              <span className="comment-time">{ moment.unix(comment.time).fromNow() }</span>

              <span>&nbsp;[ID: { comment.id }]</span>
            </header>
            <main className="comment-text link-btn">
              { ReactHtmlParser(comment.text) }
            </main>
            {/* <footer className="comment-actions">
              { comment.score }
            </footer> */}
            <div className="comment-replies">
              {
                comment.kids && commentDepth < maxCommentDepth
                  ? <CommentItemGroup 
                      commentItemIdList={comment.kids} 
                      maxCommentDepth={maxCommentDepth} 
                      currentCommentDepth={commentDepth + 1}
                    /> 
                  : comment.kids && 
                    <span>[load more] { comment.kids && <p>[{ JSON.stringify(comment.kids) }]</p> }</span>
              }
            </div>
          </section>
        </div>
      : <span>Loading comment...</span>
  );
}
 
export default CommentItem;
