import { useEffect } from "react";

import CommentItem from "./CommentItem";

const CommentItemGroup = ({ commentItemIdList , maxCommentDepth, currentCommentDepth }) => {
  useEffect(() => {
    console.log('useeffect commentitemgroup');
  }, [])

  return ( 
    commentItemIdList && 
      commentItemIdList.slice(0, 10).map((commentId) => 
        <CommentItem 
          key={commentId} 
          id={commentId} 
          maxCommentDepth={maxCommentDepth} 
          currentCommentDepth={currentCommentDepth} 
        />
      )
  );
}
 
export default CommentItemGroup;