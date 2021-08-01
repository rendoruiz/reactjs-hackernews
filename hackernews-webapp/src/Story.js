import { useEffect, useState } from "react";
import { getStory } from './api';

const Story = ({ storyId }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => data && setStory(data));
  }, [storyId])

  return ( 
    <div className="story-item">
      <p>{ story.id }</p>
      <p>{ story.by }</p>
      <p>{ story.url }</p>
      <p>{ story.title }</p>
    </div>
  );
}
 
export default Story;