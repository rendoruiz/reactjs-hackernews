import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItemData } from './../api';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import CommentItemGroup from "./CommentItemGroup";

const CommentItem = ({ id, maxCommentDepth, commentDepth, setCommentDepth }) => {
  const [comment, setComment] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItemData(id).then((data) => {
      setComment(data);
      setIsLoading(false);
      setCommentDepth(commentDepth + 1);
    })
  }, [id]);

  return ( 
    !isLoading && comment &&
    <div className="comment-item">
      <aside className="comment-expansion">
        <span>-</span>
        <div></div>
      </aside>
      <section className="comment-content">
        <header className="comment-header">
          <Link to={"/u/" + comment.by} className="link-btn comment-by">
            { comment.by }
          </Link>
          <span>&nbsp;&#183;&nbsp;</span>
          <span className="comment-time">{ moment.unix(comment.time).fromNow() }</span>

          <span>[ID: { comment.id }]</span>
        </header>
        <main className="comment-text">
          { ReactHtmlParser(comment.text) }
        </main>
        <footer className="comment-actions">
          Reply
        </footer>
        <div className="comment-replies">
          {/* <p>[{ JSON.stringify(comment.kids) }]</p> */}
          { comment.kids && commentDepth <= maxCommentDepth && <CommentItemGroup commentItemIdList={comment.kids} currentCommentDepth={commentDepth} /> }
          
        </div>
      </section>
    </div>
  );
}
 
export default CommentItem;