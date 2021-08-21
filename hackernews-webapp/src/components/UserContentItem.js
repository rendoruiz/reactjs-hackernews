import { useEffect, useState } from "react";
import ContentItemCommentCard from "./ContentItemCommentCard";
import ContentItemStoryCard from "./ContentItemStoryCard";
import api from '../api';

const UserContentItem = ({ contentId = null, restrictContent = null, userId = null }) => {
  const [contentItem, setContentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setTimeout(() => {
      api.get(`item/${contentId}.json`).then((res) => {
        setContentItem(res.data);
      }).catch((error) => {
        console.log('UserContentItem ' + error);
      }).then(() => {
        setIsLoading(false);
      });
    // }, 1000);
  }, [contentId]);
  
  const generateContentCard = (contentType) => {
    if (contentType === "story" && restrictContent !== 'comment' && userId) {
      return <ContentItemStoryCard storyObject={contentItem} userId={userId} />
    } else if (contentType === "comment" && restrictContent !== 'story' && userId) {
      return <ContentItemCommentCard comment={contentItem} userId={userId} />
    } else {
      return null;
    }
  }

  return ( 
    !contentId 
      ? null
      : isLoading 
        ? <div className="loader">Loading Item...</div>
        : !contentItem ? <span>Connection error</span> : generateContentCard(contentItem.type)
  );
}
 
export default UserContentItem;