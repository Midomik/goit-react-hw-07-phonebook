import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contacts.reducer';
import { recentlyDailedReducer } from './recentlyDailed/recentlyDailed.reducer';
// import {
//   persistStore,
//   // persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const contactsConfig = {
//   key: 'contacts',
//   storage,
//   whitelist: ['contacts'],
//   //blacklist:['filter']
// };

export const store = configureStore({
  reducer: {
    // contactsStore: persistReducer(contactsConfig, contactsReducer),
    contactsStore: contactsReducer,
    recentlyDailedStore: recentlyDailedReducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);
