import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentItemGroup from "../components/CommentItemGroup";
import ContentItemStoryCard from "../components/ContentItemStoryCard";
import api from '../api';

const StoryView = () => {
  const { id: storyId } = useParams();
  const [story, setStory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [maxCommentDepth, setMaxCommentDepth] = useState(3);
  const maxCommentDepth = 3;
  const defaultCommentItemCount = 10;
  const [commentItemCount, setCommentItemCount] = useState(defaultCommentItemCount);

  useEffect(() => { 
    // setTimeout(() => {
      api.get(`item/${storyId}.json`).then((res) => {
        setStory(res.data);
        setIsLoading(false);
        document.title = `${res.data.title} - Readit News`;
      });
    // }, 1000);
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
          <ContentItemStoryCard storyObject={story} isDetailed={true} />
        </header>
      }
      {
        story.kids && !isLoading &&
        <main className="comments">
          <CommentItemGroup 
            commentItemIdList={story.kids.slice(0, commentItemCount)} 
            maxCommentDepth={maxCommentDepth} 
          />

          { story.kids.length > commentItemCount &&
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
 
export default StoryView;