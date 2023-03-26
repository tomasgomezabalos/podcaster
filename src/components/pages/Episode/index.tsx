import {useNavigate, useParams} from "react-router-dom";
import {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "antd";
import PodcastDetails from "../../molecules/PodcastDetails";
import {useGetEpisodesQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/Loading";
import EpisodeDetails from "../../molecules/EpisodeDetails";
import {EpisodeType, PodcastType} from "../../../types";
import CustomCard from "../../molecules/CustomCard";
import {setNavigating} from "../../../redux/podcastSlice";

const Episode = () => {
  const { podcastId, episodeId } = useParams();
  const {isLoading, isSuccess, isError, error} = useGetEpisodesQuery(podcastId);
  const {podcast, episodes} = useSelector((state: any) => state.podcast);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log("Error getting episodes: ", error);
  }

  if (isSuccess) {
    const episode = episodes.find((episode: EpisodeType) => episode.id.toString() === episodeId);

    const handlePodcastClick = (value: PodcastType) => {
      dispatch(setNavigating(true));
      navigate(`/podcast/${value.id}`);
    }

    return (
      <Row gutter={16}>
        <Col span={6}>
          <PodcastDetails
            podcast={podcast}
            onClick={handlePodcastClick}
          />
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
