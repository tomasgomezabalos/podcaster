import {useNavigate, useParams} from "react-router-dom";
import {useGetEpisodesQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/loading";
import {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, Col, Row, Table} from "antd";
import PodcastDetails from "../../molecules/PodcastDetails";
import {ColumnsType} from "antd/lib/table";
import {EpisodeType} from "../../../types";
import "./styles.scss"
import {selectEpisode} from "../../../redux/podcastSlice";

const Podcast = () => {
  const { podcastId } = useParams();
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
    const columns: ColumnsType<EpisodeType> = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (value: string) => {
          const inputDate = new Date(value);
          let date, month, year;
          date = inputDate.getDate();
          month = inputDate.getMonth() + 1;
          year = inputDate.getFullYear();
          date = date.toString().padStart(2, '0');
          month = month.toString().padStart(2, '0');
          return `${date}/${month}/${year}`;
        },
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (value: number) => {
          const date = new Date(value);
          return date.toISOString().substring(11, 19);
        }
      },
    ]

    return (
      <Row gutter={16}>
        <Col span={6}>
          <PodcastDetails podcast={podcast} />
        </Col>
        <Col span={18}>
          <Card>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={episodes}
              pagination={false}
              size="small"
              rowClassName={(record, index) => {
                return index % 2 === 0 ? 'podcast__table__row_odd' : 'podcast__table__row_even';
              }}
              onRow={(record: EpisodeType) => {
                return {
                  onClick: () => {
                    dispatch(selectEpisode(record));
                    navigate(`episode/${record.id}`)
                  },
                };
              }}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Podcast as FunctionComponent;
