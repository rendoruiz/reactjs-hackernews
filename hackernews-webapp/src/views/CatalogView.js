import { useState, useEffect } from "react";
import ContentItemStoryCard from "../components/ContentItemStoryCard";

import { useLocation, useParams } from "react-router-dom";
import { faBurn, faCertificate, faChartLine } from "@fortawesome/free-solid-svg-icons";
import api from '../api';
import NavigationItem from "../components/NavigationItem";

const CatalogView = () => {
  const { order } = useParams();
  const location = useLocation();
  // const [itemOrder, setItemOrder] = useState(null);
  const [storyItemIdList, setStoryItemIdList] = useState([]);
  const itemCountIncrement = 20;
  const [itemCount, setItemCount] = useState(itemCountIncrement);

  useEffect(() => {
    const contentOrder = location.pathname.split('/').pop();
    console.log(contentOrder === null);
    // setTimeout(() => {
      if (contentOrder === 'best') {
        setDocumentTitle('Best');
        api.get('beststories.json').then((res) => setStoryItemIdList(res.data));
      } 
      else if (contentOrder === 'new') {
        setDocumentTitle('New');
        api.get('newstories.json').then((res) => setStoryItemIdList(res.data));
      } 
      else {
        setDocumentTitle('Top');
        api.get('topstories.json').then((res) => setStoryItemIdList(res.data));
      } 
    // }, 1000);
  }, [location]);

  const setDocumentTitle = (type) => {
    document.title = `${type} Stories - Readit News`;
  }

  const handleLoadMoreItems = () => {
    if (storyItemIdList.length > itemCount) {
      setItemCount(itemCount + itemCountIncrement);
    }
  }

  return ( 
    <div className="page catalog">
      <section className="stories">
        <nav className="navigation-group">
          <NavigationItem 
            routeTo='/' 
            label='Top'
            faIcon={faChartLine}
            title='Hacker News Top Stories'
          />
          <NavigationItem 
            routeTo='/best' 
            label='Best'
            faIcon={faBurn}
            title='Hacker News Best Stories'
          />
          <NavigationItem 
            routeTo='/new' 
            label='New'
            faIcon={faCertificate}
            title='Hacker News New Stories'
          />
        </nav> 

        { storyItemIdList.length <= 0 ? <span>Loading stories...</span> : storyItemIdList.slice(0, itemCount).map((itemId) => <ContentItemStoryCard key={itemId} itemId={itemId} /> ) } 

        {/* load more story items */}
        { storyItemIdList.length <= 0 ? null : storyItemIdList.length > itemCount &&
          <button className="btn more-items" onClick={handleLoadMoreItems}>
            <span>Load more stories </span> 
            <span>
              ({itemCountIncrement >= storyItemIdList.length-itemCount 
                ? storyItemIdList.length-itemCount 
                : itemCountIncrement
                } of {storyItemIdList.length-itemCount})
            </span>  
          </button> 
        }
      </section>
      <aside className="sidebar">

      </aside>
    </div>
  );
}
 
export default CatalogView;