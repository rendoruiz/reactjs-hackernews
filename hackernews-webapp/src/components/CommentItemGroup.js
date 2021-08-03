import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

const CommentItemGroup = ({ commentItemIdList , maxCommentDepth = 1, currentCommentDepth }) => {
  const [commentDepth, setCommentDepth] = useState(0);

  useEffect(() => {
    if (currentCommentDepth) {
      setCommentDepth(currentCommentDepth);
    }
  }, [])

  return ( 
    commentItemIdList && commentItemIdList.slice(0, 10).map((commentId) => <CommentItem id={commentId} maxCommentDepth={maxCommentDepth} commentDepth={commentDepth} setCommentDepth={setCommentDepth} />)
  );
}
 
export default CommentItemGroup;