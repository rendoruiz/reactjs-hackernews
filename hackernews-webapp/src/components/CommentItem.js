import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import CommentItemGroup from "./CommentItemGroup";
import { getItemData } from '../functions/hackernewsApi';
import { generateHslColor } from "../functions/generateHslColor";
import { getMinifiedMomentTime } from "../functions/getMinifiedMomentTime";

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
  }, [maxCommentDepth, id]);

  return ( 
    <div className={comment.deleted && 'd-none'}>
      {!isLoading 
        ? comment.by && !comment.deleted && 
          <div className="comment-item">
            <aside className="comment-expansion">
              <Link 
                to={"/u/" + comment.by} 
                className="user-avatar"
                style={{backgroundColor: generateHslColor(comment.by)}}
              >
                { comment.by ? comment.by.substring(0, 1) : '' }
              </Link>
              <div className="vertical-toggle"></div>
            </aside>

            <section className="comment-content">
              <header className="comment-header">
                <Link to={"/u/" + comment.by} className="link-btn comment-by">
                  { comment.by }
                </Link>
                <span>&nbsp;&#183;&nbsp;</span>
                <span className="comment-time">{ getMinifiedMomentTime(moment.unix(comment.time).fromNow()) }</span>

                <span>&nbsp;&nbsp;&nbsp;[ID: { comment.id }] [{moment.unix(comment.time).fromNow()}]</span>
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
      }
    </div>
  );
}
 
export default CommentItem;
