import { useEffect, useState } from "react";
import { getItemData } from "../functions/hackernewsApi";
import ContentItemCommentCard from "./ContentItemCommentCard";
import ContentItemStoryCard from "./ContentItemStoryCard";

const UserContentItem = ({ contentId = null, restrictContent = null, userId = null }) => {
  const [contentItem, setContentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getItemData(contentId).then((data) => {
        setContentItem(data);
        setIsLoading(false);
      });
    }, 1000);
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
        : !isLoading && contentItem && generateContentCard(contentItem.type)
  );
}
 
export default UserContentItem;