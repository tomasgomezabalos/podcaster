import {Image, Typography} from "antd";
import {PodcastType} from "../../../types";
import "./styles.scss"
import CustomDivider from "../../atoms/CustomDivider";
import CustomCard from "../CustomCard";
import HtmlText from "../../atoms/HtmlText";

export interface IPodcastDetailsProps {
  podcast: PodcastType;
  onClick?: (podcast: PodcastType) => void;
}

const PodcastDetails = ({ podcast, onClick }: IPodcastDetailsProps) => {
  const { name, author, image, description } = podcast;

  const navigateToPodcast = () => {
    onClick && onClick(podcast);
  }

  return (
    <CustomCard>
      <div className="podcastDetails">
        <div className="podcastDetails__image">
          <Image
            preview={false}
            src={image}
            height={100}
            onClick={navigateToPodcast}
          />
        </div>
        <CustomDivider />
        <Typography.Title
          level={5}
          onClick={navigateToPodcast}
          style={{ cursor: "pointer" }}
        >
          {name}
        </Typography.Title>
        <Typography.Text
          italic
          onClick={navigateToPodcast}
          style={{ cursor: "pointer" }}
        >
          {`by ${author}`}
        </Typography.Text>
        {description && (
          <>
            <CustomDivider />
            <Typography.Title level={5}>Description:</Typography.Title>
            <Typography.Paragraph italic>
              <HtmlText text={description} />
            </Typography.Paragraph>
          </>
        )}
      </div>
    </CustomCard>
  );
};

export default PodcastDetails;
