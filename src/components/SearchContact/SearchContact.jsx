import { useSelector, useDispatch } from 'react-redux';
import { filterContactList } from 'redux/contacts/contacts.reducer';

import css from './SearchContact.module.css';
import { contactsFilter } from 'redux/contacts/contacts.selectors';

export const SearchContact = () => {
  const dispatch = useDispatch();
  const value = useSelector(contactsFilter);

  const findContatct = e => {
    filterContact(e.target.value);
  };

  const filterContact = searchWords => {
    dispatch(filterContactList(searchWords));
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
