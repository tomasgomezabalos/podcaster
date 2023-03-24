import {useParams} from "react-router-dom";
import {FunctionComponent} from "react";

const Episode = () => {
  const { podcastId, episodeId } = useParams();
  return (
    <div>
      <h1>{`Episode: ${episodeId} of the Podcast: ${podcastId}`}</h1>
    </div>
  );
}

export default Episode as FunctionComponent;
