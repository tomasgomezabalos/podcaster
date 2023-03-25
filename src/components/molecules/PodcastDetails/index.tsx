import {Image, Typography} from "antd";
import {PodcastType} from "../../../types";
import "./styles.scss"
import CustomDivider from "../../atoms/CustomDivider";
import CustomCard from "../CustomCard";
import HtmlText from "../../atoms/HtmlText";

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
        <Typography.Title level={5}>{name}</Typography.Title>
        <Typography.Text italic>{`by ${author}`}</Typography.Text>
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
