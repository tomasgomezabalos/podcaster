import {Link, useParams} from "react-router-dom";
import {useGetEpisodesQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/loading";
import {EpisodeType} from "../../../types";
import {FunctionComponent} from "react";

const Podcast = () => {
  const { podcastId } = useParams();
  const {data, isLoading, isSuccess, isError, error} = useGetEpisodesQuery(podcastId);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log("Error getting podcasts: ", error);
  }

  if (isSuccess) {
    const episodes = data as EpisodeType[];
    return (
      <div>
        <h1>{`Episodes of the Podcast: ${podcastId}`}</h1>
        {episodes?.map((episode: EpisodeType) => {
          const {id, title} = episode;
          return (
            <div key={id}>
              <Link to={`episode/${id}`}>{title}</Link>
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default Podcast as FunctionComponent;
