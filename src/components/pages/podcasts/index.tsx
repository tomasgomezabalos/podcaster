import {useGetPodcastsQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/loading";
import {PodcastType} from "../../../types";
import {Link} from "react-router-dom";
import {FunctionComponent} from "react";

const Podcasts = () => {
  const {data, isLoading, isSuccess, isError, error} = useGetPodcastsQuery(100);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log("Error getting podcasts: ", error);
  }

  if (isSuccess) {
    const podcasts = data as PodcastType[];
    return (
      <div>
        <h1>Podcasts</h1>
        {podcasts?.map((podcast: PodcastType) => {
          const {id, name} = podcast;
          return (
            <div key={id}>
              <Link to={`podcast/${id}`}>{name}</Link>
            </div>
          )
        })}
        <h1>Podcasts</h1>
      </div>
    )
  }
}

export default Podcasts as FunctionComponent;
