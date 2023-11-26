// import { Form } from './Form/Form';
// import { ContactList } from './ContactList/ContactList';
// import { SearchContact } from './SearchContact/SearchContact';

import css from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from 'pages/SharedLayout/SharedLayout';
import { HomePage } from 'pages/HomePage/HomePage';
import { RecentlyDialed } from 'pages/RecentlyDialed/RecentlyDialed';
import { Favorite } from 'pages/Favorite/Favorite';

export const App = () => {
  return (
    // <div className={css.main_container}>
    //   <Form />
    //   <SearchContact />
    //   <ContactList />
    // </div>
    <div className={css.main_container}>
      <SharedLayout>
        <div className={css.container}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recently_dialed" element={<RecentlyDialed />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </SharedLayout>
    </div>
  );
};
