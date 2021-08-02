import { useEffect, useState } from "react";
import { getStory } from './../api';

const StoryItem = ({ storyId, storyNumber }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => {
      if (data.type === 'story') {
        setStory(data);
      }
    });
  }, [storyId])

  return ( 
    story && (
      <div className="story-item">
        <section className="story-score">
          <span>{ story.score }</span>
        </section>
        <section className="story-content">

          <header>
            <span>[ID: { story.id }] Posted by { story.by } { story.time }</span>
            <a href="">link</a>
          </header>
          <main>
            <h3 class="story-title">{ story.title }</h3>
            <a class="story-url">{ story.url }</a>
          </main>
          <footer>
            <a href="">Comments</a>
            <a href="">Share</a>
            <a href="">Save</a>
            <a href="">Hide</a>
            <a href="">Report</a>
          </footer>
        </section>
      </div>
    )
  );
}
 
export default StoryItem;