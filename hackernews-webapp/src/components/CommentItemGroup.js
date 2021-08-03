import { useEffect } from "react";

import CommentItem from "./CommentItem";

const CommentItemGroup = ({ commentItemIdList , maxCommentDepth, currentCommentDepth }) => {
  useEffect(() => {
    console.log('useeffect commentitemgroup');
  }, [])

  return ( 
    commentItemIdList && commentItemIdList.map((commentId) => 
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