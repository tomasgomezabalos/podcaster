import {describe, expect, vi} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import Podcast from "../../../../../src/components/pages/Podcast";
import {useGetEpisodesQuery} from "../../../../../src/redux/podcastApi";

vi.mock("../../../../../src/redux/podcastApi");

vi.mock("react-router-dom", () => ({
  useParams: () => ({podcastId: "1"}),
  useNavigate: () => vi.fn(),
}));
vi.mock("react-redux", () => ({
  useSelector: () => (
    {
      podcast: {name: "name", author: "author", image: "image", description: "description"},
      episodes: []
    }
  ),
  useDispatch: () => vi.fn(),
}));

describe("Podcast", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("should render loading state", () => {
    // @ts-ignore
    useGetEpisodesQuery.mockReturnValue({
      isLoading: true,
    });
    const {container} = render(
      <Podcast />
    );
    expect(container.getElementsByClassName('loading').length).toBe(1);
  });

  it("should render error state", () => {
    // @ts-ignore
    useGetEpisodesQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { error: "error" }
    });
    const {container} = render(
      <Podcast />
    );
    expect(container.getElementsByClassName('loading').length).toBe(0);
    expect(container.getElementsByClassName('error').length).toBe(1);
  });

  it("should render success state", () => {
    // @ts-ignore
    useGetEpisodesQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
    });
    const {container} = render(
      <Podcast />
    );
    expect(container.getElementsByClassName('loading').length).toBe(0);
    expect(container.getElementsByClassName('error').length).toBe(0);
    expect(container.getElementsByClassName('podcastDetails').length).toBe(1);
    expect(screen.getByText('Episodes: 0')).toBeInTheDocument();
  });
});
