import {useGetPodcastsQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/loading";
import {PodcastType} from "../../../types";
import {useNavigate} from "react-router-dom";
import {FunctionComponent} from "react";
import {Space} from "antd";
import PodcastListItem from "../../molecules/podcastListItem";

const Podcasts = () => {
  const navigate = useNavigate();
  const {data, isLoading, isSuccess, isError, error} = useGetPodcastsQuery(100);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log("Error getting podcasts: ", error);
  }

  const handlePodcastClick = (podcast: PodcastType) => {
    navigate(`/podcast/${podcast.id}`);
  }

  if (isSuccess) {
    const podcasts = data as PodcastType[];
    return (
      <Space direction="horizontal" wrap>
        {podcasts?.map((podcast: PodcastType) => {
          return (
            <PodcastListItem
              key={podcast.id}
              data={podcast}
              onClick={handlePodcastClick}
            />
          )
        })}
      </Space>
    )
  }
}

export default Podcasts as FunctionComponent;
