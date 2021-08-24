import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import StoryCard from "./StoryCard";
import api from '../api';

const UserContentItem = ({ contentId, restrictContent, userId }) => {
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
      return <StoryCard storyData={contentItem} userId={userId} />
    } else if (contentType === "comment" && restrictContent !== 'story' && userId) {
      return <CommentCard commentData={contentItem} userId={userId} />
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