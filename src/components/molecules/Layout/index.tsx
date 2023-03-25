import {Outlet, useNavigate} from "react-router-dom";
import "./styles.scss";
import CustomDivider from "../../atoms/CustomDivider";
import {HomeOutlined, LoadingOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const {isNavigating} = useSelector((state: any) => state.podcast);

  const handleHome = () => {
    navigate("/");
  }

  return (
    <div className="layout">
      <div className="layout__header">
        <div className="layout__header__link" onClick={handleHome}>
          <HomeOutlined style={{ fontSize: 34, color: "#82aac0" }} />
          <span className="layout__header__link__text">Podcaster</span>
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
