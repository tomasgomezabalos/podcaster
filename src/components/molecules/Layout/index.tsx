import {Outlet, useNavigate} from "react-router-dom";
import "./styles.scss";
import CustomDivider from "../../atoms/CustomDivider";
import {HomeOutlined, LoadingOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {setNavigating} from "../../../redux/podcastSlice";

const Layout = () => {
  const navigate = useNavigate();
  const {isNavigating} = useSelector((state: any) => state.podcast);
  const dispatch = useDispatch();

  const handleHome = () => {
    dispatch(setNavigating(true));
    navigate("/");
  }

  return (
    <div className="layout">
      <div className="layout__header">
        <div className="layout__header__link">
          <HomeOutlined
            style={{ fontSize: 34, color: "#82aac0", cursor: "pointer" }}
            onClick={handleHome}
          />
          <span
            className="layout__header__link__text"
            onClick={handleHome}
          >
            Podcaster
          </span>
          {isNavigating && (
            <div className="layout__header__navigating">
              <LoadingOutlined style={{ fontSize: 34, color: "#82aac0" }} />
            </div>
          )}
        </div>
        <CustomDivider />
      </div>

      <Outlet />
    </div>
  );
}

export default Layout;
