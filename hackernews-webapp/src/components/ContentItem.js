import { useEffect, useState } from "react";

import CommentTemplate from "./CommentTemplate";
import StoryTemplate from "./StoryTemplate";
import { getItemData } from '../functions/hackernewsApi';

const ContentItem = ({ itemId }) => {
  const [item, setItem] = useState({});
  const [isStory, setIsStory] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getItemData(itemId).then(data => {
        if (!data.deleted) {
          if (data.type === 'story') {
            setItem(data);
            setIsStory(true);
          } else if (data.type === 'comment') {
            setItem(data)
            setIsComment(true);
          }
        }
        setIsLoading(false);
      });
    }, 1000);
  }, [itemId])

  return (
    <div>
      { isLoading && <span>Loading Item...</span> }
      { !isLoading && item && isStory && <StoryTemplate story={item} />}
      { !isLoading && item && isComment && <CommentTemplate comment={item} /> }
    </div>
  );
}
 
export default ContentItem;