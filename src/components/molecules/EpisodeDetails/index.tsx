import {EpisodeType} from "../../../types";
import {Typography} from "antd";

export interface IEpisodeDetailsProps {
  episode: EpisodeType;
}

const EpisodeDetails = ({ episode }: IEpisodeDetailsProps) => {
  const { title, description, url } = episode;

  return (
    <div className="episodeDetails">
      <Typography.Title level={3}>{title}</Typography.Title>
      <Typography.Paragraph style={{ fontSize: 16 }} italic>
        <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: description }} />
      </Typography.Paragraph>
      <audio controls style={{ width: "100%", marginTop: 20 }}>
        <source src={url} />
      </audio>
    </div>
  )
}

export default EpisodeDetails;
