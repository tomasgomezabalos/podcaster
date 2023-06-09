import {Typography} from 'antd';

import {EpisodeType} from '../../../types';
import HtmlText from '../../atoms/HtmlText';

export interface IEpisodeDetailsProps {
  episode: EpisodeType;
}

const EpisodeDetails = ({episode}: IEpisodeDetailsProps) => {
  const {title, description, url} = episode;

  return (
    <div className="episodeDetails">
      <Typography.Title level={2}>{title}</Typography.Title>
      <Typography.Paragraph italic>
        <HtmlText text={description} />
      </Typography.Paragraph>
      <audio controls style={{width: '100%', marginTop: 20}}>
        <source src={url} />
      </audio>
    </div>
  );
};

export default EpisodeDetails;
