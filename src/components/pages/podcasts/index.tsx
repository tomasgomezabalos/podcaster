import {useGetPodcastsQuery} from "../../../services/podcastApi";
import Loading from "../../atoms/loading";
import {PodcastType} from "../../../types";
import {useNavigate} from "react-router-dom";
import {FormEvent, FunctionComponent, useTransition} from "react";
import {Space} from "antd";
import PodcastListItem from "../../molecules/podcastListItem";
import Search from "antd/es/input/Search";
import {useDispatch, useSelector} from "react-redux";
import {filterPodcasts} from "../../../redux/podcastSlice";

const Podcasts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data, isLoading, isSuccess, isError, error} = useGetPodcastsQuery(100);
  let [isPending, startTransition] = useTransition();
  const {podcasts: filteredPodcasts} = useSelector((state: any) => state.podcast);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    console.log("Error getting podcasts: ", error);
  }

  const handlePodcastClick = (podcast: PodcastType) => {
    navigate(`/podcast/${podcast.id}`);
  }

  const handleSearch = (event: FormEvent<HTMLInputElement>) => {
    startTransition(() => {
      dispatch(filterPodcasts({filter: event.currentTarget.value, data}));
    });
  };

  if (isSuccess) {
    const podcasts = filteredPodcasts as PodcastType[];
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <div style={{ width: "100%", textAlign: "right" }}>
          <Search
            addonBefore={(
              <span style={{ fontSize: 20, fontWeight: 600, color: "white" }}>{podcasts?.length}</span>
            )}
            placeholder="input search text"
            allowClear
            onChange={handleSearch}
            style={{ width: 400 }}
            size="large"
            enterButton
            loading={isPending}
          />
        </div>
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
      </Space>
    )
  }
}

export default Podcasts as FunctionComponent;
