import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import css from './RecentlyDialed.module.css';

import { IconTrash } from 'components/assets/sprite';
import { SearchContactRecently } from 'components/SearchContactRecently/SearchContactRecently';
import {
  getRecentlyDailed,
  removeFromRecentlyDailed,
} from 'redux/recentlyDailed/recentlyDailed.reducer';
import {
  recentlyDailedContacts,
  recentlyDailedFilter,
} from 'redux/recentlyDailed/recentlyDailed.selectors';
import { Loader } from 'components/Loader/Loader';

export const RecentlyDialed = () => {
  const dispatch = useDispatch();
  const recentlyContacts = useSelector(recentlyDailedContacts).items;
  const filter = useSelector(recentlyDailedFilter);
  const isLoader = useSelector(recentlyDailedContacts).isLoading;

  const visibleContacts = () => {
    const listByName = recentlyContacts.filter(item =>
      item.recectlyItemInfo.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase().trim())
    );

    const listByNumber = recentlyContacts.filter(item =>
      item.recectlyItemInfo.number
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase().trim())
    );

    const generalList = listByName.length !== 0 ? listByName : listByNumber;

    return filter === '' ? recentlyContacts : generalList;
  };

  const removeItem = id => {
    dispatch(removeFromRecentlyDailed(id));
  };

  useEffect(() => {
    dispatch(getRecentlyDailed());
  }, [dispatch]);

  return (
    <>
      <h2 className={css.recently_list_title}>Recently Dailed</h2>
      <SearchContactRecently />
      {isLoader && <Loader />}
      <ul className={css.recently_list_contact}>
        {visibleContacts()
          .toReversed()
          .map(item => {
            const { name, number } = item.recectlyItemInfo;
            const { recentlyItemTime, id } = item;
            const hours = recentlyItemTime.split(':')[0];
            const minutes = recentlyItemTime.split(':')[1];

            return (
              <li key={id} className={css.recently_item}>
                <div className={css.contact_info_container}>
                  <p className={css.contact_name}> {name}</p>
                </div>
                <p className={css.contact_number}>{number}</p>
                <div className={css.control_contact_tools_container}>
                  <div className={css.time_item}>
                    {hours.padStart(2, '0')}:{minutes.padStart(2, '0')}
                  </div>
                  <div
                    onClick={() => {
                      removeItem(id);
                    }}
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
