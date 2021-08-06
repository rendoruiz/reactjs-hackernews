import { useEffect, useState } from "react";
import { getItemData } from "../functions/hackernewsApi";

const UserContentItem = ({ contentId = null }) => {
  const [contentItem, setContentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getItemData(contentId).then((data) => {
        setContentItem(data);
        setIsLoading(false);
      });
    }, 1000)
  }, [contentId]);
  

  return ( 
    !contentId 
      ? null
      : isLoading 
        ? <div className="loader">Loading Item...</div>
        : !isLoading && contentItem
          ? (contentItem.type === "story" && <div>Story Card</div>)
          : (contentItem.type === "comment" && <div>Comment Card</div>)
          // : contentItem.type === "comment" && <div>Comment Card</div>
  );
}
 
export default UserContentItem;