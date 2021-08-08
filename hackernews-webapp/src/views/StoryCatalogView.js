import { useState, useEffect } from "react";
import ContentItemStoryCard from "../components/ContentItemStoryCard";
import { getTopStoryIds } from "../functions/hackernewsApi";

const StoryCatalogView = () => {
  // const [itemCount, setItemCount] = useState(20);
  const itemCount = 20;
  // const [itemOrder, setItemOrder] = useState('top');
  const [storyItemIdList, setStoryItemIdList] = useState(null);

  useEffect(() => {
    getTopStoryIds().then((data) => {
      setStoryItemIdList(data);
      document.title = "Top Stories - Readit News";
      console.log(data);
    });
  }, []);

  const handleOrderTypeClick = ({ e, order }) => {
    e.preventDefault();
    // setItemOrder(order);
    console.log(this.type);
  }

  return ( 
    <div className="page catalog">
      <section className="stories">
        <div className="stories-actions">
          <button className="btn" onClick={(e) => handleOrderTypeClick({e, order: 'top'})}>Top</button>
          <button className="btn" onClick={(e) => handleOrderTypeClick({e, order: 'best'})}>Best</button>
          <button className="btn" onClick={(e) => handleOrderTypeClick({e, order: 'new'})}>New</button>
        </div>
        
        { !storyItemIdList ? <span>Loading stories...</span> : storyItemIdList.slice(0, itemCount).map((itemId) => <ContentItemStoryCard key={itemId} itemId={itemId} />) } <ContentItemStoryCard />
      </section>
      <aside className="sidebar">

      </aside>
    </div>
  );
}
 
export default StoryCatalogView;