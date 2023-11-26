import { NavLink } from 'react-router-dom';
import css from './SharedLayout.module.css';

export const SharedLayout = ({ children }) => {
  return (
    <div>
      <header>
        <nav className={css.navigation_links}>
          <NavLink className="shared_layout_item_link" to="/">
            Home
          </NavLink>
          <NavLink className="shared_layout_item_link" to="/recently_dialed">
            Recently Dailed
          </NavLink>
          <NavLink className="shared_layout_item_link" to="/favorite">
            Favorite
          </NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};
