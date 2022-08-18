const getCommonVideos = async (queryString) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const BASE_ENDPOINT = "https://youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `${BASE_ENDPOINT}/${queryString}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error("Youtube api error", error);
      return [];
    }

    return data.items.map((item) => {
      return {
        id: item?.id?.videoId | item?.id?.channelId,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
      };
    });
  } catch (error) {
    console.log("Something wrong with videos library", error);
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
