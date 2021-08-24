import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { faBurn, faCertificate, faChartLine } from "@fortawesome/free-solid-svg-icons";

import api from '../api';
import CatalogViewLoader from "../components/Loaders/CatalogViewLoader";
import ConnectionError from "../components/ConnectionError";
import NavigationBar from "../components/NavigationBar";
import NavigationItem from "../components/NavigationItem";
import StoryCard from "../components/StoryCard";

import styles from "../styles/views/CatalogView.module.css";

const CatalogView = () => {
  const location = useLocation();
  const [storyIdList, setStoryIdList] = useState(null);
  const itemCountIncrement = 20;
  const [itemCount, setItemCount] = useState(itemCountIncrement);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const contentOrder = location.pathname.split('/').pop();
    let request;

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

    api.get(request + '.json').then((response) => { 
      setStoryIdList(response.data)
    }).catch((error) => {
      console.log('CatalogView ' + error);
    }).then(() => {
      setIsLoading(false);
    });
  }, [location]);

  const setDocumentTitle = (type) => {
    document.title = `${type} Stories - Readit News`;
  }

  const handleLoadStoryItems = () => {
    if (storyIdList.length > itemCount) {
      setItemCount(itemCount + itemCountIncrement);
    }
  }

  return isLoading ? <CatalogViewLoader /> : !storyIdList ? <ConnectionError /> : ( 
    <div className={styles.catalogView}>
      <section className={styles.catalog}>
        <NavigationBar>
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
        </NavigationBar>

        { storyIdList.slice(0, itemCount).map((itemId) => <StoryCard key={itemId} storyId={itemId} />) } 

        {/* load more story items */}
        { storyIdList.length > itemCount &&
          <button className={styles.button} onClick={handleLoadStoryItems}>
            Load more stories&nbsp;(
            {itemCountIncrement >= storyIdList.length-itemCount 
              ? storyIdList.length-itemCount 
              : itemCountIncrement
              } of {storyIdList.length-itemCount})
          </button> 
        }
      </section>
      {/* <aside className="sidebar"></aside> */}
    </div>
  );
}
 
export default CatalogView;