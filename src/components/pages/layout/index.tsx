import {Link, Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h1><Link to="/">Layout</Link></h1>

      <hr />

      <Outlet />
    </div>
  );
}

export default Layout;
