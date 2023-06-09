import './styles.scss';

import {Image, Tooltip, Typography} from 'antd';

import {PodcastType} from '../../../types';
import CustomDivider from '../../atoms/CustomDivider';
import HtmlText from '../../atoms/HtmlText';
import CustomCard from '../CustomCard';

export interface IPodcastDetailsProps {
  podcast: PodcastType;
  onClick?: (podcast: PodcastType) => void;
}

const PodcastDetails = ({podcast, onClick}: IPodcastDetailsProps) => {
  const {name, author, image, description} = podcast;

  const navigateToPodcast = () => {
    onClick && onClick(podcast);
  };

  return (
    <CustomCard>
      <div className="podcastDetails">
        <div className="podcastDetails__image">
          <Tooltip title={onClick ? 'View podcast details...' : ''}>
            <Image
              preview={false}
              src={image}
              height={100}
              onClick={navigateToPodcast}
              style={{cursor: onClick ? 'pointer' : 'default'}}
              alt={name}
            />
          </Tooltip>
        </div>
        <CustomDivider />
        <Tooltip title={onClick ? 'View podcast details...' : ''} placement="topLeft">
          <Typography.Title
            level={4}
            onClick={navigateToPodcast}
            style={{cursor: onClick ? 'pointer' : 'default'}}
          >
            {name}
          </Typography.Title>
        </Tooltip>
        <Tooltip title={onClick ? 'View podcast details...' : ''} placement="bottomLeft">
          <Typography.Text
            italic
            onClick={navigateToPodcast}
            style={{cursor: onClick ? 'pointer' : 'default'}}
          >
            {`by ${author}`}
          </Typography.Text>
        </Tooltip>
        {description && (
          <>
            <CustomDivider />
            <Typography.Title level={4}>Description:</Typography.Title>
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
