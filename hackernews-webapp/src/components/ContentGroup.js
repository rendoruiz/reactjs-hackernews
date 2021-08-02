import ContentItem from './ContentItem';

const ContentGroup = ({ storyIdList, title, contentType }) => {

  
  return ( 
    <div className="story-group">
      { title && <h2>{ title }</h2> }
      { storyIdList.map((story, index) => <ContentItem key={story} storyId={story} storyNumber={index + 1} />) }
    </div>
  );
}
 
export default ContentGroup;