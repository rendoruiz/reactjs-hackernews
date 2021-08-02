const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const topStoriesUrl = baseUrl + 'topstories.json';
const storyBaseUrl = baseUrl + 'item/';

const getTopStoryIds = async () => {
  return await fetch(topStoriesUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Could not fetch data from "${topStoriesUrl}"`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

const getStory = async (storyId) => {
  const storyIdUrl = storyBaseUrl + storyId + '.json';
  return await fetch(storyIdUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Could not fetch data from "${storyIdUrl}"`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export { getTopStoryIds, getStory };