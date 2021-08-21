import { useState, useEffect } from "react";
import ContentItemStoryCard from "../components/ContentItemStoryCard";

import { useHistory, useParams } from "react-router-dom";
import { faBurn, faCertificate, faChartLine } from "@fortawesome/free-solid-svg-icons";
import api from '../api';
import NavigationItem from "../components/NavigationItem";

const CatalogView = () => {
  const { order } = useParams();
  const [itemOrder, setItemOrder] = useState(null);
  const [storyItemIdList, setStoryItemIdList] = useState([]);
  const history = useHistory();
  const itemCountIncrement = 20;
  const [itemCount, setItemCount] = useState(itemCountIncrement);

  useEffect(() => {
    // setTimeout(() => {
      if (order === 'best') {
        setDocumentTitle('Best');
        setItemOrder('best');
        api.get('beststories.json').then((res) => setStoryItemIdList(res.data));
        console.log('loading best')
      } 
      else if (order === 'new') {
        setDocumentTitle('New');
        setItemOrder('new');
        api.get('newstories.json').then((res) => setStoryItemIdList(res.data));
        console.log('loading new')
      } 
      else if (order === 'top' || !order) {
        setDocumentTitle('Top');
        setItemOrder('top');
        api.get('topstories.json').then((res) => setStoryItemIdList(res.data));
        console.log('loading top')
      } 
    // }, 1000);
  }, [order, history]);

  const setDocumentTitle = (type) => {
    document.title = `${type} Stories - Readit News`;
  }

  const setActiveButton = (type) => {
    if (type === itemOrder) {
      return ' active';
    }
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