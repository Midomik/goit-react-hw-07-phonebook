import { useDispatch } from 'react-redux';

import { addToFavorite, removeContact } from 'redux/contacts/contacts.reducer';

import css from './ContactItem.module.css';
import { IconCall, IconLike, IconTrash } from 'components/assets/sprite';
import { addToRecentlyDailed } from 'redux/recentlyDailed/recentlyDailed.reducer';

export const ContactItem = ({ name, number, id, isFavorite }) => {
  console.log(id);
  const dispatch = useDispatch();

  const removeItem = del_id => {
    console.log('delete');

    dispatch(removeContact(del_id));
  };

  const addFavorite = info => {
    console.log('add to favorite');
    dispatch(addToFavorite(info));
  };
  const addRecently = id => {
    dispatch(addToRecentlyDailed({ name, number }));
    console.log('add recently');
  };
  return (
    <li key_id={id} className={css.contact_item}>
      <div className={css.contact_info_container}>
        <p className={css.contact_name}> {name}</p>
      </div>
      <p className={css.contact_number}>{number}</p>

      <div className={css.control_contact_tools_container}>
        <div onClick={() => addRecently(id)} className={css.call_item}>
          <a href={`tel:${number}`}>
            <IconCall width={40} height={40} />
          </a>
        </div>

        <div
          onClick={() => addFavorite({ id, isFavorite })}
          className={css.like_item}
        >
          <IconLike width={40} height={40} isLike={isFavorite} />
        </div>

        <div onClick={() => removeItem(id)} className={css.delete_item}>
          <IconTrash width={40} height={40} />
        </div>
      </div>
    </li>
  );
};
