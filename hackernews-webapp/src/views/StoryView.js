import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from '../api';
import StoryCard from "../components/StoryCard";
import StoryCardLoader from "../components/Loaders/StoryCardLoader";
import CommentItemGroup from "../components/CommentItemGroup";
import ConnectionError from "../components/ConnectionError";
import CommentEmpty from "../components/Comment/CommentEmpty";

import styles from '../styles/views/StoryView.module.css'

const StoryView = () => {
  const { id: storyId } = useParams();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const commentItemDepth = 3;
  const itemCountIncrement = 8;
  const [commentItemCount, setCommentItemCount] = useState(itemCountIncrement);

  useEffect(() => { 
    api.get(`item/${storyId}.json`).then((response) => {
      setStory(response.data);
      document.title = `${response.data.title} - Readit News`;
      console.log(response.data);
    }).catch((error) => {
      console.log('StoryView ' + error);
    }).then(() => {
      setIsLoading(false);
    });
  }, [commentItemDepth, storyId, commentItemCount]);

  const handleLoadCommentItems = () => {
    if (story.kids.length > commentItemCount) {
      setCommentItemCount(commentItemCount + itemCountIncrement);
    }
  }

  return isLoading ? <StoryCardLoader /> : !story ? <ConnectionError /> : ( 
    <div className={styles.storyView}>
      <StoryCard storyData={story} isDetailed={true} />
      {
        !story.kids ? <CommentEmpty /> : <> 
          <div className={styles.commentList}>
            <CommentItemGroup 
              commentItemIdList={story.kids.slice(0, commentItemCount)} 
              maxCommentDepth={commentItemDepth} 
            />

            { story.kids.length > commentItemCount &&
              <button className={styles.button} onClick={handleLoadCommentItems}>
                Load more comments&nbsp;(
                { itemCountIncrement >= story.kids.length-commentItemCount 
                  ? story.kids.length-commentItemCount 
                  : itemCountIncrement
                  } of {story.kids.length-commentItemCount}
                )
              </button> 
            }
          </div>
        </>
      }
    </div>
  );
}
 
export default StoryView;