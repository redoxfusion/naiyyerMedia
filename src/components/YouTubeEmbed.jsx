import YouTube from "react-youtube";

const YouTubeEmbed = () => {
  const videoOptions = {
    height: "390",
    width: "640",
    playerVars: {
    },
  };

  // Extract video ID from the URL
  const videoId = "aCQSKMG7-1M"; // You can extract this from the YouTube URL

  return <YouTube videoId={videoId} opts={videoOptions} />;
};

export default YouTubeEmbed;

