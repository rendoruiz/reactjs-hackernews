import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemData } from "../api";
import CommentItemGroup from "../components/CommentItemGroup";
import StoryTemplate from "../components/StoryTemplate"

const StoryDetail = () => {
  const { id: storyId } = useParams();
  const [story, setStory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getItemData(storyId).then((data) => {
        setStory(data);
        setIsLoading(false);
        document.title = `${data.title} - PlebbitNews`;
      })
      if (story.kids) {
        getItemData()
      } 
    }, 1000);
  }, [storyId, story]);

  return ( 
    <div className="story-detail page">
      {
        story && !isLoading && 
        <header className="story">
          <StoryTemplate story={story} isDetailedView={true} />
        </header>
      }
      {
        story.kids && !isLoading &&
        <main className="comments">
          <CommentItemGroup commentItemIdList={story.kids} maxCommentDepth={3} />
        </main>
      }
      { !story.kids && !isLoading && <span>No comments</span> }
      { isLoading && <span>fetching story...</span> }
    </div>
  );
}
 
export default StoryDetail;