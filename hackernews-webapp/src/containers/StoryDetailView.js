import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentItemGroup from "../components/CommentItemGroup";
import StoryTemplate from "../components/StoryTemplate"
import { getItemData } from '../functions/hackernewsApi';

const StoryDetailView = () => {
  const { id: storyId } = useParams();
  const [story, setStory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [maxCommentDepth, setMaxCommentDepth] = useState(3);
  const maxCommentDepth = 3;
  const defaultCommentItemCount = 10;
  const [commentItemCount, setCommentItemCount] = useState(defaultCommentItemCount);

  useEffect(() => { 
    setTimeout(() => {
      getItemData(storyId).then((data) => {
        setStory(data);
        setIsLoading(false);
        document.title = `${data.title} - PlebbitNews`;
      })
    }, 1000);
  }, [maxCommentDepth, storyId, commentItemCount]);

  const handleLoadMoreItems = () => {
    if (story.kids.length > commentItemCount) {
      setCommentItemCount(commentItemCount + defaultCommentItemCount);
    }
  }

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
          <CommentItemGroup 
            commentItemIdList={story.kids.slice(0, commentItemCount)} 
            maxCommentDepth={maxCommentDepth} 
          />

          { !isLoading && story.kids.length > commentItemCount &&
            <button className="btn more-items" onClick={handleLoadMoreItems}>
              <span>Load more comments </span> 
              <span>
                ({defaultCommentItemCount >= story.kids.length-commentItemCount 
                  ? story.kids.length-commentItemCount 
                  : defaultCommentItemCount
                  } of {story.kids.length-commentItemCount})
              </span>  
            </button> 
          }
        </main>
      }
      { isLoading && <span className="loader">Loading story...</span> }
      { !story.kids && !isLoading && <span className="comments">No comments</span> }
    </div>
  );
}
 
export default StoryDetailView;