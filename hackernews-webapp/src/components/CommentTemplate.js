import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

const CommentTemplate = ({ comment }) => {

  return ( 
    <div className="comment-item">
      <header>
        <span>{ comment.by }</span> commented on <span>{ comment.parent }</span>
      </header>
      <main>
        <div>
          <span>{ comment.by }</span>
          <span>&nbsp;&#183;&nbsp;</span>
          <span>{ moment.unix(comment.time).fromNow() }</span>
        </div>
        <div>{ ReactHtmlParser(comment.text)  }</div>
      </main>
    </div>
  );
}
 
export default CommentTemplate;