import TopStories from "./TopStories"
import { useState, useEffect } from 'react';
import { getTopStoryIds } from './api';

const Home = () => {
  const storyCount = 20;
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getTopStoryIds().then(data => {
      setStoryIds(data.slice(0, storyCount))
      console.log(data)
    });
  }, []);

  return ( 
    <div className="home">
      <h1>Home</h1>
      {storyIds && <TopStories storyIds={storyIds} />}
    </div>
  );
}
 
export default Home;