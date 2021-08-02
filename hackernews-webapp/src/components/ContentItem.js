import { useEffect, useState } from "react";
import { getStoryData } from '../api';
import StoryTemplate from "./StoryTemplate";

const ContentItem = ({ storyId }) => {
  const [item, setItem] = useState({});
  const [isStory, setIsStory] = useState(false);
  const [isComment, setIsComment] = useState(false);

  useEffect(() => {
    getStoryData(storyId).then(data => {
      if (!data.deleted) {
        if (data.type === 'story') {
          setItem(data);
          setIsStory(true);
        } else if (data.type === 'comment') {
          setIsComment(true);
        }
      }
    });
  }, [storyId])

  return (
    <div>
      {item && isStory && <StoryTemplate story={item} />}
      {item.id && isComment && <span>le comment</span> }
    </div>
  );
}
 
export default ContentItem;