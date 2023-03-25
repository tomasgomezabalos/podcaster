import {useParams} from "react-router-dom";
import {FunctionComponent} from "react";
import {useSelector} from "react-redux";
import {Col, Row} from "antd";
import PodcastDetails from "../../molecules/PodcastDetails";
import {useGetEpisodesQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/Loading";
import EpisodeDetails from "../../molecules/EpisodeDetails";
import {EpisodeType} from "../../../types";
import CustomCard from "../../molecules/CustomCard";

const Episode = () => {
  const { podcastId, episodeId } = useParams();
  const {isLoading, isSuccess, isError, error} = useGetEpisodesQuery(podcastId);
  const {podcast, episodes} = useSelector((state: any) => state.podcast);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log("Error getting episodes: ", error);
  }

  if (isSuccess) {
    const episode = episodes.find((episode: EpisodeType) => episode.id.toString() === episodeId);

    return (
      <Row gutter={16}>
        <Col span={6}>
          <PodcastDetails podcast={podcast} />
        </Col>
        <Col span={18}>
          <CustomCard>
            <EpisodeDetails episode={episode} />
          </CustomCard>
        </Col>
      </Row>
    );
  }
}

export default Episode as FunctionComponent;
