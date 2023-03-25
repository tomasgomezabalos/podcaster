import {Card, Divider, Image} from "antd";
import {PodcastType} from "../../../types";
import "./styles.scss"

export interface IPodcastDetailsProps {
  podcast: PodcastType;
}

const PodcastDetails = ({ podcast }: IPodcastDetailsProps) => {
  const { name, author, image, description } = podcast;

  return (
    <Card>
      <div className="podcastDetails">
        <div className="podcastDetails__image">
          <Image
            preview={false}
            src={image}
            height={100}
          />
        </div>
        <Divider />
        <div className="podcastDetails__title">{name}</div>
        <div className="podcastDetails__text">{`by ${author}`}</div>
        {description && (
          <>
            <Divider />
            <div className="podcastDetails__title">Description:</div>
            <div className="podcastDetails__text">{description}</div>
          </>
        )}
      </div>
    </Card>
  );
};

export default PodcastDetails;
