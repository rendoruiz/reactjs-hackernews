const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const topStoriesUrl = baseUrl + 'topstories.json';
const storyUrl = baseUrl + 'item/';

const getTopStoryIds = async () => {
  const topStoryIdsData = await fetch(topStoriesUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Could not fetch data from "${topStoriesUrl}"`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });

    return topStoryIdsData;
  }

const getStory = async (storyId) => {
  const storyIdUrl = storyUrl + storyId + '.json';
  const storyData = await fetch(storyIdUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Could not fetch data from "${storyIdUrl}"`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });

  return storyData;
}

export { getTopStoryIds, getStory };