import { useDispatch, useSelector } from 'react-redux';
import css from './Favorite.module.css';
import { useEffect } from 'react';
import {
  addToFavorite,
  getContacts,
  removeContact,
} from 'redux/contacts/contacts.reducer';
import { IconCall, IconLike, IconTrash } from 'components/assets/sprite';

import { SearchContact } from 'components/SearchContact/SearchContact';
import { addToRecentlyDailed } from 'redux/recentlyDailed/recentlyDailed.reducer';
import {
  contactsFilter,
  mainContacts,
} from 'redux/contacts/contacts.selectors';
import { Loader } from 'components/Loader/Loader';

export const Favorite = () => {
  const dispatch = useDispatch();

  const allContacts = useSelector(mainContacts).items;
  const filter = useSelector(contactsFilter);
  const isLoader = useSelector(mainContacts).isLoading;

  const favoriteContacts = allContacts.filter(item => item.isFavorite === true);
  useEffect(() => {
    console.log('dispach');
    dispatch(getContacts());
  }, [dispatch]);

  const visibleContacts = () => {
    const listByName = favoriteContacts.filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
    );

    const listByNumber = favoriteContacts.filter(item =>
      item.number
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase().trim())
    );

    const generalList = listByName.length !== 0 ? listByName : listByNumber;

    return filter === '' ? favoriteContacts : generalList;
  };

  const removeItem = id => {
    console.log('delete');

    dispatch(removeContact(id));
  };

  const addFavorite = info => {
    console.log('add to favorite');
    dispatch(addToFavorite(info));
  };
  const addRecently = info => {
    dispatch(addToRecentlyDailed(info));
    console.log('add recently');
  };
  console.log(allContacts);
  console.log(favoriteContacts);
  return (
    <>
      <h2 className={css.favorite_list_title}>Favorite</h2>
      <SearchContact />
      {isLoader && <Loader />}
      <ul className={css.favorite_list_contact}>
        {visibleContacts()
          .toReversed()
          .map(item => {
            const { name, number, isFavorite, id } = item;

            return (
              <li key={id} className={css.favorite_item}>
                <div className={css.contact_info_container}>
                  <p className={css.contact_name}> {name}</p>
                </div>
                <p className={css.contact_number}>{number}</p>

                <div className={css.control_contact_tools_container}>
                  <div
                    onClick={() => addRecently({ name, number })}
                    className={css.call_item}
                  >
                    <a href={`tel:${number}`}>
                      <IconCall width={20} height={20} />
                    </a>
                  </div>

                  <div
                    onClick={() => addFavorite({ id, isFavorite })}
                    className={css.like_item}
                  >
                    <IconLike width={20} height={20} isLike={isFavorite} />
                  </div>

                  <div
                    onClick={() => removeItem(id)}
                    className={css.delete_item}
                  >
                    <IconTrash width={20} height={20} />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
};
