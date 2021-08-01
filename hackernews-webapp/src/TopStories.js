
import Story from './Story';

const TopStories = ({storyIds}) => {
  return ( 
    <div className="story-group">
      { storyIds.map((story) => (
        <Story key={story} storyId={story} />
      ))}
    </div>
  );
}
 
export default TopStories;