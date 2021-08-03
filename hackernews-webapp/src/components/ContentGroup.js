import { useState, useEffect } from 'react';

import ContentItem from './ContentItem';
import { getTopStoryIds } from '../functions/hackernewsApi';

const ContentGroup = ({ orderBy, itemCount, setItemCount, contentType, customItemIdList }) => {
  const [itemIdList, setItemIdList] = useState(Array.apply({}, Array(itemCount)));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (customItemIdList) {
        setItemIdList(customItemIdList.slice(0, itemCount));
        setIsLoading(false);
      }
      else {
        getTopStoryIds().then(data => {
          setItemIdList(data.slice(0, itemCount));
          setIsLoading(false);
        });
      }
    }, 1000);
  }, [itemCount, customItemIdList]);

  const handleLoadMoreItems = () => {
    if (itemCount < 500) {
      setItemCount(itemCount + 20);
    }
  }
  
  return ( 
    <div className="content-group">
      { isLoading && <span>Loading...</span> }
      { !isLoading && itemIdList.map((item) => 
        <ContentItem 
          key={item} 
          itemId={item} 
        />) 
      }
      { !isLoading && itemIdList && <button onClick={handleLoadMoreItems}>More Items</button> }
    </div>
  );
}
 
export default ContentGroup;