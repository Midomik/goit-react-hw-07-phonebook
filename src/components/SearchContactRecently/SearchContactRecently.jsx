import { useSelector, useDispatch } from 'react-redux';

import css from './SearchContactRecently.module.css';
import { filterRecentlyDailedList } from 'redux/recentlyDailed/recentlyDailed.reducer';
import { recentlyDailedFilter } from 'redux/recentlyDailed/recentlyDailed.selectors';

export const SearchContactRecently = () => {
  const dispatch = useDispatch();
  const value = useSelector(recentlyDailedFilter);

  const findContatct = e => {
    filterContact(e.target.value);
  };

  const filterContact = searchWords => {
    dispatch(filterRecentlyDailedList(searchWords));
  };

  return (
    <div className={css.search_container}>
      <h2 className={css.search_title}>Find contacts</h2>
      <input
        className={css.search_input}
        onChange={findContatct}
        type="text"
        name="search"
        value={value}
        placeholder="..."
      />
    </div>
  );
};
