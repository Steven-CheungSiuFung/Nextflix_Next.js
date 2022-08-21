const getCommonVideos = async (queryString) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY2;

  try {
    const BASE_ENDPOINT = "https://youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `${BASE_ENDPOINT}/${queryString}&maxResults=5&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      console.error("Youtube api error", error);
      return [];
    }

    const videosData = data.items.map((item) => ({
      id: item.id.videoId || item.id,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
    }));

    return videosData;
  } catch (error) {
    console.log("Something wrong with videos library.", error);
    return [];
  }
};

export const getVideos = async (keyword) => {
  const queryString = `search?part=snippet&q=${keyword}&type=video`;
  return await getCommonVideos(queryString);
};

export const getPopularVideos = async () => {
  const queryString = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;
  return await getCommonVideos(queryString);
};

export const getVideoDetials = async (videoId) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY2;

  try {
    const BASE_ENDPOINT = "https://youtube.googleapis.com/youtube/v3";
    const queryString = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    const response = await fetch(
      `${BASE_ENDPOINT}/${queryString}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      console.error("Youtube api error", error);
      return [];
    }

    const videoDataArray = data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics.viewCount || 0,
    }));

    const videoData = videoDataArray[0];

    return videoData;
  } catch (error) {
    console.log("Something wrong with videos library.", error);
    return [];
  }
};
