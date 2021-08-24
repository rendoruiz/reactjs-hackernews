import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { faBurn, faCertificate, faChartLine } from "@fortawesome/free-solid-svg-icons";

import api from '../api';
import NavigationItem from "../components/NavigationItem";
import StoryCard from "../components/StoryCard";

const CatalogView = () => {
  const location = useLocation();
  const [storyIdList, setStoryIdList] = useState([]);
  const itemCountIncrement = 20;
  const [itemCount, setItemCount] = useState(itemCountIncrement);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const contentOrder = location.pathname.split('/').pop();
    let request;
    // setTimeout(() => {
      if (contentOrder === 'best') {
        setDocumentTitle('Best');
        request = 'beststories';
      } 
      else if (contentOrder === 'new') {
        setDocumentTitle('New');
        request = 'newstories';
      } 
      else {
        setDocumentTitle('Top');
        request = 'topstories';
      } 

      api.get(request + '.json').then((res) => { 
        setStoryIdList(res.data)
      }).catch((error) => {
        console.log('CatalogView ' + error);
      }).then(() => {
        setIsLoading(false);
      });
    // }, 1000);
  }, [location]);

  const setDocumentTitle = (type) => {
    document.title = `${type} Stories - Readit News`;
  }

  const handleLoadMoreItems = () => {
    if (storyIdList.length > itemCount) {
      setItemCount(itemCount + itemCountIncrement);
    }
  }

  return isLoading ? <span>Loading Stories...</span> : storyIdList.length <= 0 ? <span>Connection error</span> : ( 
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

        { storyIdList.length <= 0 ? <span>Loading stories...</span> : storyIdList.slice(0, itemCount).map((itemId) => <StoryCard key={itemId} storyId={itemId} /> ) } 

        {/* load more story items */}
        { storyIdList.length <= 0 ? null : storyIdList.length > itemCount &&
          <button className="btn more-items" onClick={handleLoadMoreItems}>
            <span>Load more stories </span> 
            <span>
              ({itemCountIncrement >= storyIdList.length-itemCount 
                ? storyIdList.length-itemCount 
                : itemCountIncrement
                } of {storyIdList.length-itemCount})
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