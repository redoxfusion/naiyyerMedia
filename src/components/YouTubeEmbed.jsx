import YouTube from "react-youtube";

const YouTubeEmbed = () => {
  const videoOptions = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId="https://www.youtube.com/watch?v=aCQSKMG7-1M" opts={videoOptions} />;
};

export default YouTubeEmbed;
