import {Col, Row} from 'antd';
import {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {setNavigating} from '../../../redux/podcastSlice';
import {useGetEpisodesQuery} from '../../../services/podcastApi';
import {EpisodeType, PodcastType} from '../../../types';
import Error from '../../atoms/Error';
import Loading from '../../atoms/Loading';
import CustomCard from '../../molecules/CustomCard';
import EpisodeDetails from '../../molecules/EpisodeDetails';
import PodcastDetails from '../../molecules/PodcastDetails';

const Episode = () => {
  const {podcastId, episodeId} = useParams();
  const {isLoading, isSuccess, isError, error} = useGetEpisodesQuery(podcastId);
  const {podcast, episodes} = useSelector((state: any) => state.podcast);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message="Error getting episodes" error={error} />;
  }

  if (isSuccess) {
    const episode = episodes.find((episode: EpisodeType) => episode.id.toString() === episodeId);

    const handlePodcastClick = (value: PodcastType) => {
      dispatch(setNavigating(true));
      navigate(`/podcast/${value.id}`);
    };

    return (
      <Row gutter={16}>
        <Col span={6}>
          <PodcastDetails podcast={podcast} onClick={handlePodcastClick} />
        </Col>
        <Col span={18}>
          <CustomCard>
            <EpisodeDetails episode={episode} />
          </CustomCard>
        </Col>
      </Row>
    );
  }
};

export default Episode as FunctionComponent;
