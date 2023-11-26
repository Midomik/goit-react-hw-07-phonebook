import { ContactList } from 'components/ContactList/ContactList';
import css from './HomePage.module.css';
import { SearchContact } from 'components/SearchContact/SearchContact';
import { Form } from 'components/Form/Form';

import { Loader } from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { mainContacts } from 'redux/contacts/contacts.selectors';
export const HomePage = () => {
  const isLoader = useSelector(mainContacts).isLoading;
  return (
    <div className={css.main_container}>
      <h2 className={css.recently_list_title}>Phonebook</h2>
      <div className={css.control_element_container}>
        <Form />
        <SearchContact />
      </div>
      {isLoader && <Loader />}
      <ContactList />
    </div>
  );
};
