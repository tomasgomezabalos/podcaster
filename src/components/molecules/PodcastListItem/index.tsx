import {PodcastType} from "../../../types";
import {Card, Image, Tooltip} from "antd";
import "./styles.scss"

export interface IPodcastListItemProps {
  data: PodcastType;
  onClick: (podcast: PodcastType) => void;
}

const PodcastListItem = ({ data, onClick }: IPodcastListItemProps) => {
  const { name, author, image } = data;

  const handlePodcastClick = () => {
    onClick(data);
  }

  return (
    <Card
      hoverable
      style={{
        border: 0
      }}
      onClick={handlePodcastClick}
    >
      <div className="podcastListItem">
        <div className="podcastListItem__image">
          <Image
            style={{ borderRadius: "50%" }}
            preview={false}
            src={image}
            height={70}
          />
        </div>
        <Tooltip title="View podcast details...">
          <Card
            style={{
              border: "1px solid #ccc",
              boxShadow: "2px 2px 2px 1px #cccccc",
              position: "absolute",
              top: 10,
              paddingTop: 20,
              height: 130,
              width: 150,
            }}
          >
            <div className="podcastListItem__data__name">{name}</div>
            <div className="podcastListItem__data__author">{`Author: ${author}`}</div>
          </Card>
        </Tooltip>
      </div>
    </Card>
  )
}

export default PodcastListItem;
