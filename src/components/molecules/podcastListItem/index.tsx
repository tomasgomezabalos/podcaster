import {PodcastType} from "../../../types";
import {Card, Image} from "antd";
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
        margin: "10px",
        overflow: "hidden",
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
        <div className="podcastListItem__data">
          <div className="podcastListItem__data__name">{name}</div>
          <div className="podcastListItem__data__author">{`Author: ${author}`}</div>
        </div>
      </div>
    </Card>
  )
}

export default PodcastListItem;
