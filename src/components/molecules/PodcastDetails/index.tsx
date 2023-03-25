import {Image, Typography} from "antd";
import {PodcastType} from "../../../types";
import "./styles.scss"
import CustomDivider from "../../atoms/CustomDivider";
import CustomCard from "../CustomCard";
import HtmlText from "../../atoms/HtmlText";
import {useNavigate} from "react-router-dom";

export interface IPodcastDetailsProps {
  podcast: PodcastType;
}

const PodcastDetails = ({ podcast }: IPodcastDetailsProps) => {
  const { name, author, image, description } = podcast;
  const navigate = useNavigate();

  const navigateToPodcast = () => {
    navigate(`/podcast/${podcast.id}`);
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
