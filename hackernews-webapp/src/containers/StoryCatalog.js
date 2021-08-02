import { useState, useEffect } from "react";
import StoryGroup from "../components/StoryGroup";
import { getTopStoryIds } from './../api';

const StoryCatalog = () => {
  const [storyItemCount, setStoryItemCount] = useState(20);
  const [storyIdList, setStoryIdList] = useState([]);

  useEffect(() => {
    getTopStoryIds().then(data => {
      setStoryIdList(data.slice(0, storyItemCount))
      console.log(data)
    });
    document.title = "Catalog";
  }, [storyItemCount])

  const handleMoreStories = () => {
    if (storyItemCount < 500) {
      setStoryItemCount(storyItemCount + 20);
    }
  }

  return ( 
    <div className="catalog">
      <h1>Home</h1>
      {storyIdList && <StoryGroup storyIdList={storyIdList} title="Top Story" />}
      {storyIdList && <button onClick={handleMoreStories}>More Stories</button>}
    </div>
  );
}
 
export default StoryCatalog;