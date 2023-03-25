import {EpisodeType} from "../../../types";
import {Typography} from "antd";
import HtmlText from "../../atoms/HtmlText";

export interface IEpisodeDetailsProps {
  episode: EpisodeType;
}

const EpisodeDetails = ({ episode }: IEpisodeDetailsProps) => {
  const { title, description, url } = episode;

  return (
    <div className="episodeDetails">
      <Typography.Title level={3}>{title}</Typography.Title>
      <Typography.Paragraph style={{ fontSize: 16 }} italic>
        <HtmlText text={description} />
      </Typography.Paragraph>
      <audio controls style={{ width: "100%", marginTop: 20 }}>
        <source src={url} />
      </audio>
    </div>
  )
}

export default EpisodeDetails;
