import './styles.scss';

import {Col, Row, Table, Tooltip, Typography} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {setNavigating} from '../../../redux/podcastSlice';
import {useGetEpisodesQuery} from '../../../redux/podcastApi';
import {EpisodeType} from '../../../types';
import {formatDate, formatDuration} from '../../../utils';
import Error from '../../atoms/Error';
import Loading from '../../atoms/Loading';
import CustomCard from '../../molecules/CustomCard';
import PodcastDetails from '../../molecules/PodcastDetails';

const Podcast = () => {
  const {podcastId} = useParams();
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
    const columns: ColumnsType<EpisodeType> = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (value: string, record: EpisodeType) => (
          <Tooltip title="View episode details...">
            <Typography.Text
              strong
              type="secondary"
              onClick={() => {
                dispatch(setNavigating(true));
                navigate(`episode/${record.id}`);
              }}
            >
              {value}
            </Typography.Text>
          </Tooltip>
        )
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (value: string) => <Typography.Text strong>{formatDate(value)}</Typography.Text>
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (value: number) => <Typography.Text strong>{formatDuration(value)}</Typography.Text>
      }
    ];

    return (
      <Row gutter={16}>
        <Col span={6}>
          <PodcastDetails podcast={podcast} />
        </Col>
        <Col span={18}>
          <>
            <div className="podcast__title">
              <Typography.Title level={2} style={{margin: '5px 0 5px 5px'}}>
                {`Episodes: ${episodes.length}`}
              </Typography.Title>
            </div>
            <CustomCard>
              <Table
                rowKey="id"
                columns={columns}
                dataSource={episodes}
                pagination={false}
                size="small"
                rowClassName={(record, index) => {
                  return index % 2 === 0 ? 'podcast__table__row_odd' : 'podcast__table__row_even';
                }}
              />
            </CustomCard>
          </>
        </Col>
      </Row>
    );
  }
};

export default Podcast as FunctionComponent;
