import {useNavigate, useParams} from "react-router-dom";
import {useGetEpisodesQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/Loading";
import {FunctionComponent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row, Table, Typography} from "antd";
import PodcastDetails from "../../molecules/PodcastDetails";
import {ColumnsType} from "antd/lib/table";
import {EpisodeType} from "../../../types";
import "./styles.scss"
import CustomCard from "../../molecules/CustomCard";
import {setNavigating} from "../../../redux/podcastSlice";

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
        render: (value: string, record: EpisodeType) => (
          <Typography.Text
            strong
            style={{ color: "#607786" }}
            onClick={() => {
              dispatch(setNavigating(true));
              navigate(`episode/${record.id}`);
            }}
          >
            {value}
          </Typography.Text>
        )
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
          return (
            <Typography.Text strong>{`${date}/${month}/${year}`}</Typography.Text>
          )
        },
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (value: number) => {
          const date = new Date(value);
          return (
            <Typography.Text strong>{date.toISOString().substring(11, 19)}</Typography.Text>
          )
        }
      },
    ]

    return (
      <Row gutter={16}>
        <Col span={6}>
          <PodcastDetails podcast={podcast} />
        </Col>
        <Col span={18}>
          <>
            <div className="podcast__title">
              <Typography.Title
                level={2}
                style={{ margin: "5px 0 5px 5px" }}
              >
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
    )
  }
}

export default Podcast as FunctionComponent;
