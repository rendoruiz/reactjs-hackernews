import StoryItem from './StoryItem';

const StoryGroup = ({ storyIdList, title }) => {
  return ( 
    <div className="story-group">
      <h2>{ title }</h2>
      { storyIdList.map((story, index) => <StoryItem key={story} storyId={story} storyNumber={index + 1} />) }
    </div>
  );
}
 
export default StoryGroup;