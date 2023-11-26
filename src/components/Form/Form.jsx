import { useState } from 'react';

import { nanoid } from 'nanoid';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contacts.reducer';

import css from './Form.module.css';
import { mainContacts } from 'redux/contacts/contacts.selectors';

export const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(mainContacts).items;

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const hendlerSubmit = e => {
    e.preventDefault();
    let isInList = contacts.some(
      itemContact =>
        itemContact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (isInList) {
      alert(`${name} is already in contacts!`);
    } else {
      addToContact({
        name,
        number,
        id: nanoid(),
      });
      resetForm(e);
    }
  };

  const handleChangeInput = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const addToContact = item => {
    dispatch(addContact(item));
  };

  const resetForm = e => {
    e.currentTarget.elements.name.value = '';
    e.currentTarget.elements.number.value = '';
  };

  return (
    <form onSubmit={hendlerSubmit} className={css.form}>
      <label>
        <h2 className={css.title_item}>Name</h2>
        <input
          onChange={handleChangeInput}
          className={css.name_input}
          type="text"
          name="name"
          required
          placeholder="..."
          pattern="[^0-9]+"
          title="Must not contain numbers"
        />
      </label>
      <label>
        <h2 className={css.title_item}>Number</h2>
        <input
          onChange={handleChangeInput}
          className={css.name_input}
          type="tel"
          name="number"
          required
          placeholder="..."
          pattern="^\d{3}-\d{3}-\d{4}$"
          title="Need to format 000-000-0000"
        />
      </label>
      <button className={css.sub_btn} type="submit">
        Add to contact
      </button>
    </form>
  );
};
