import { useState, useEffect } from "react";
import ContentGroup from "../components/ContentGroup";
import { getTopStoryIds } from './../api';

const StoryCatalog = () => {
  const [ContentItemCount, setContentItemCount] = useState(20);
  const [storyIdList, setStoryIdList] = useState([]);
  const [orderType, setOrderType] = useState('top');

  useEffect(() => {
    getTopStoryIds().then(data => {
      setStoryIdList(data.slice(0, ContentItemCount))
      console.log(data)
    });
    document.title = "Catalog";
  }, [ContentItemCount])

  const handleMoreStories = () => {
    if (ContentItemCount < 500) {
      setContentItemCount(ContentItemCount + 20);
    }
  }

  return ( 
    <div className="page catalog">
      <section className="stories">
        <h1>Home</h1>
        {storyIdList && <ContentGroup storyIdList={storyIdList} title="Top Story" />}
        {storyIdList && <button onClick={handleMoreStories}>More Stories</button>}
      </section>
      <aside className="sidebar">

      </aside>
    </div>
  );
}
 
export default StoryCatalog;