import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import PodcastDetails, {
  IPodcastDetailsProps
} from '../../../../../src/components/molecules/PodcastDetails';
import {PodcastType} from '../../../../../src/types';

const renderPodcastDetails = ({podcast, onClick}: IPodcastDetailsProps) => {
  const {container} = render(<PodcastDetails podcast={podcast} onClick={onClick} />);
  return container;
};
describe('PodcastDetails', () => {
  it('renders all successfully', () => {
    const podcast: PodcastType = {
      id: 'id',
      name: 'name',
      author: 'author',
      image: 'image',
      description: 'description'
    };
    const onClick = vi.fn();
    const container = renderPodcastDetails({podcast, onClick});
    expect(container.getElementsByClassName('podcastDetails').length).toBe(1);
    // exists an image with "pointer" cursor && onClick is called
    expect(container.getElementsByClassName('podcastDetails__image').length).toBe(1);
    const image = screen.getByAltText(podcast.name);
    expect(image).toBeInTheDocument();
    expect(image.style.cursor).toBe('pointer');
    fireEvent.click(image);
    expect(onClick).toHaveBeenCalledTimes(1);
    // exists description
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText(podcast.description)).toBeInTheDocument();
  });

  it('renders without description', () => {
    const podcast: PodcastType = {
      id: 'id',
      name: 'name',
      author: 'author',
      image: 'image',
      description: ''
    };
    const onClick = vi.fn();
    const container = renderPodcastDetails({podcast, onClick});
    expect(container.getElementsByClassName('podcastDetails').length).toBe(1);
    // no exists description
    expect(screen.queryByText('Description:')).not.toBeInTheDocument();
  });

  it('renders without onClick', () => {
    const podcast: PodcastType = {
      id: 'id',
      name: 'name',
      author: 'author',
      image: 'image',
      description: 'description'
    };
    const container = renderPodcastDetails({podcast});
    // exists an image with "default" cursor && onClick does not exist
    expect(container.getElementsByClassName('podcastDetails__image').length).toBe(1);
    const image = screen.getByAltText(podcast.name);
    expect(image).toBeInTheDocument();
    expect(image.style.cursor).toBe('default');
    expect(image).not.toHaveAttribute('onClick');
  });
});
