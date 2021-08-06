import { useEffect, useState } from "react";
import { getItemData } from "../functions/hackernewsApi";
import ContentItemCommentCard from "./ContentItemCommentCard";
import ContentItemStoryCard from "./ContentItemStoryCard";

const UserContentItem = ({ contentId = null }) => {
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
    if (contentType === "story") {
      return <ContentItemStoryCard story={contentItem} />
    } else if (contentType === "comment") {
      return <ContentItemCommentCard comment={contentItem} />
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