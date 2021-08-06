const ContentItemCommentCard = ({ comment = null }) => {


  return ( 
    !comment ? null : 
      <div className="content-card comment-card">
        Comment Card
      </div>
  );
}
 
export default ContentItemCommentCard;