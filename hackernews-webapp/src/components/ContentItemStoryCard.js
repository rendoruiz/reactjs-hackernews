const ContentItemStoryCard = ({ story = null }) => {

  return ( 
    !story ? null : 
      <div className="content-card story-card">
        Story Card
      </div>
  );
}
 
export default ContentItemStoryCard;