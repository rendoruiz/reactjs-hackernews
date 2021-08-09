import { useState, useEffect } from "react";
import ContentItemStoryCard from "../components/ContentItemStoryCard";
import { getStoryIdList } from "../functions/hackernewsApi";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory, useParams } from "react-router-dom";
import { faBurn, faCertificate, faChartLine } from "@fortawesome/free-solid-svg-icons";

const StoryCatalogView = () => {
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
        getStoryIdList('best').then((data) => {
          setStoryItemIdList(data);
        });
        console.log('loading best')
      } 
      else if (order === 'new') {
        setDocumentTitle('New');
        setItemOrder('new');
        getStoryIdList('new').then((data) => {
          setStoryItemIdList(data);
        });
        console.log('loading new')
      } 
      else if (order === 'top' || !order) {
        setDocumentTitle('Top');
        setItemOrder('top');
        getStoryIdList('top').then((data) => {
          setStoryItemIdList(data);
        });
        console.log('loading top')
      } 
      else {
        history.push(`/`);
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
        <header className="navigation-group">
          <Link 
            className={`navigation-item ` + setActiveButton('top')}
            to={`/top`}
            title="Top Stories from Hacker News"
          >
            <FontAwesomeIcon icon={faChartLine} className="glyph" />
            <span>Top Story</span>
          </Link>
          <Link 
            className={`navigation-item ` + setActiveButton('best')}
            to={`/best`}
            title="Best Stories from Hacker News"
          >
            <FontAwesomeIcon icon={faBurn} className="glyph" />
          <span>Best Story</span>
          </Link>
          <Link 
            className={`navigation-item ` + setActiveButton('new')}
            to={`/new`}
            title="New Stories from Hacker News"
          >
            <FontAwesomeIcon icon={faCertificate} className="glyph" />
            <span>New Story</span>
          </Link>
        </header> 

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
 
export default StoryCatalogView;