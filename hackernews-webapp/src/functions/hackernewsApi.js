const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
const topStoriesUrl = baseUrl + 'topstories.json';
const bestStoriesUrl = baseUrl + 'beststories.json';
const newStoriesUrl = baseUrl + 'newstories.json';
const storyBaseUrl = baseUrl + 'item/';
const userBaseUrl = baseUrl + 'user/';

const getStoryIdList = async (order = null) => {
  const fetchUrl = order === 'best'
    ? bestStoriesUrl : 'new'
    ? newStoriesUrl : topStoriesUrl
  return await fetch(fetchUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Could not fetch data from "${fetchUrl}"`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

const getItemData = async (itemId) => {
  const storyIdUrl = storyBaseUrl + itemId + '.json';
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

const getUserData = async (userId) => {
  const userIdUrl = userBaseUrl + userId + '.json';
  return await fetch(userIdUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Could not fetch data from "${userIdUrl}"`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

export { getStoryIdList, getItemData, getUserData };