import './Breadcrumps.css';
import { NavLink, useLocation } from 'react-router-dom';
import { linkMatches } from '../../utils/constants';

export default function Breadcrumps() {
  const { pathname } = useLocation();
  const links = pathname.split('/');

  return(
    <nav className="bread-crumps">
      <ul className="bread-crumps__links">
        {
          links.map((item) => {
            if (item === '') {
              return(
                <li className="bread-crumps__item">
                  <NavLink to="/" className={({isActive}) => `bread-crumps__link ${isActive ? "bread-crumps__link_active" : ""}`} >
                    Главная
                  </NavLink>
                </li>
              );
            }
            const link = pathname.slice(0, pathname.indexOf(item) + item.length);
            const { name } = linkMatches.find(item => item.path === link);
            return (
              <li className="bread-crumps__item">
                <span className="bread-crumps__dash" />
                <NavLink to={link} className={`bread-crumps__link ${link === pathname ? "bread-crumps__link_active" : ""}`} >
                  {name}
                </NavLink>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};
