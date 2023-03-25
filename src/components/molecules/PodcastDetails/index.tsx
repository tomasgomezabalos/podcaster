import {Image} from "antd";
import {PodcastType} from "../../../types";
import "./styles.scss"
import CustomDivider from "../CustomDivider";
import CustomCard from "../CustomCard";

export interface IPodcastDetailsProps {
  podcast: PodcastType;
}

const PodcastDetails = ({ podcast }: IPodcastDetailsProps) => {
  const { name, author, image, description } = podcast;

  return (
    <CustomCard>
      <div className="podcastDetails">
        <div className="podcastDetails__image">
          <Image
            preview={false}
            src={image}
            height={100}
          />
        </div>
        <CustomDivider />
        <div className="podcastDetails__title">{name}</div>
        <div className="podcastDetails__text">{`by ${author}`}</div>
        {description && (
          <>
            <CustomDivider />
            <div className="podcastDetails__title">Description:</div>
            <div className="podcastDetails__text">{description}</div>
          </>
        )}
      </div>
    </CustomCard>
  );
};

export default PodcastDetails;
