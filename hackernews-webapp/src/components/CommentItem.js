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
    if (isLoading) {
      getItemData(id).then((data) => {
        setComment(data);
        setCommentDepth(commentDepth + 1);
        setIsLoading(false);
      })
    }

    console.log('useeffect commentitem');
  }, [id]);

  // https://stackoverflow.com/a/49562686
  const getHashCode = (str) => {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  const pickColor = (str) => {
    return `hsl(${getHashCode(str) % 360}, 100%, 80%)`;
  }

  return ( 
    !isLoading && comment &&
    <div className="comment-item">
      <aside className="comment-expansion">
        <Link 
          to={"/u/" + comment.by} 
          className="user-avatar"
          style={{backgroundColor: pickColor(comment.by)}}
        >
          { comment.by.substring(0, 1) }
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
          {/* { comment.kids && <p>[{ JSON.stringify(comment.kids) }]</p> } */}
          { comment.kids && commentDepth <= maxCommentDepth && <CommentItemGroup commentItemIdList={comment.kids} currentCommentDepth={commentDepth} /> }
        </div>
      </section>
    </div>
  );
}
 
export default CommentItem;