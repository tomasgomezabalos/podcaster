import './styles.scss';

import {Input, Space} from 'antd';
import {FormEvent, FunctionComponent, useTransition} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {filterPodcasts, selectPodcast} from '../../../redux/podcastSlice';
import {useGetPodcastsQuery} from '../../../services/podcastApi';
import {PodcastType} from '../../../types';
import Error from '../../atoms/Error';
import Loading from '../../atoms/Loading';
import PodcastListItem from '../../molecules/PodcastListItem';

const Podcasts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data, isLoading, isSuccess, isError, error} = useGetPodcastsQuery(100);
  const [, startTransition] = useTransition();
  const {podcasts: filteredPodcasts} = useSelector((state: any) => state.podcast);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message="Error getting podcasts" error={error} />;
  }

  const handlePodcastClick = (podcast: PodcastType) => {
    dispatch(selectPodcast(podcast));
    navigate(`/podcast/${podcast.id}`);
  };

  const handleSearch = (event: FormEvent<HTMLInputElement>) => {
    startTransition(() => {
      dispatch(filterPodcasts({filter: event.currentTarget.value, data: data || []}));
    });
  };

  if (isSuccess) {
    const podcasts = filteredPodcasts as PodcastType[];
    return (
      <Space direction="vertical" style={{width: '100%'}}>
        <div className="podcasts__search">
          <Input
            addonBefore={
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'white'
                }}
              >{`${podcasts?.length}`}</span>
            }
            placeholder="Filter podcasts..."
            allowClear
            onChange={handleSearch}
            style={{width: 400}}
            size="large"
          />
        </div>
        <Space direction="horizontal" wrap>
          {podcasts?.map((podcast: PodcastType) => {
            return <PodcastListItem key={podcast.id} data={podcast} onClick={handlePodcastClick} />;
          })}
        </Space>
      </Space>
    );
  }
};

export default Podcasts as FunctionComponent;
