import {Link, Outlet} from "react-router-dom";
import "./styles.scss";
import {Divider} from "antd";

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout__header">
        <Link className="layout__link" to="/">Podcaster</Link>
        <Divider />
      </div>

      <Outlet />
    </div>
  );
}

export default Layout;
