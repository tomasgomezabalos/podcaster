import './styles.scss';

import {HomeOutlined, LoadingOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

import {setNavigating} from '../../../redux/podcastSlice';
import CustomDivider from '../../atoms/CustomDivider';

const Layout = () => {
  const navigate = useNavigate();
  const {isNavigating} = useSelector((state: any) => state.podcast);
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleHome = () => {
    if (!isHome) {
      dispatch(setNavigating(true));
      navigate('/');
    }
  };

  return (
    <div className="layout">
      <div className="layout__header">
        <div className="layout__header__link">
          <Tooltip title={isHome ? '' : 'Go to home page...'}>
            <HomeOutlined
              style={{fontSize: 34, color: '#82aac0', cursor: !isHome ? 'pointer' : 'default'}}
              onClick={handleHome}
            />
            <span
              className="layout__header__link__text"
              style={{cursor: !isHome ? 'pointer' : 'default'}}
              onClick={handleHome}
            >
              Podcaster
            </span>
          </Tooltip>
          {isNavigating && (
            <div className="layout__header__navigating">
              <LoadingOutlined style={{fontSize: 34, color: '#82aac0'}} />
            </div>
          )}
        </div>
        <CustomDivider />
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
