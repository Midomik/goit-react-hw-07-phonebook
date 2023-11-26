import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://655f2569879575426b44a797.mockapi.io/';
const contactInitialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },

  filter: '',
};
// const recentlyDailedInitialState = {
//   recentlyDailed: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   recentlyArray: [],
//   filter: '',
// };
export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contactInfo, thunkApi) => {
    try {
      console.log(contactInfo);
      await axios.post('contacts', contactInfo);
      return contactInfo;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/delete',
  async (contact_id, thunkApi) => {
    console.log(contact_id);

    try {
      await axios.delete(`contacts/${contact_id}`);
      return contact_id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addToFavorite = createAsyncThunk(
  'contacts/add_to_favorite',
  async (contact_info, thunkApi) => {
    try {
      console.log('id', ' ', contact_info);
      await axios.put(`contacts/${contact_info.id}`, {
        isFavorite: !contact_info.isFavorite,
      });
      return contact_info.id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const addToRecentlyDailed = createAsyncThunk(
//   'recentlyDailed/add_to_recently_dailed',
//   async (contact_info, thunkApi) => {
//     try {
//       await axios.post(`recently_dailed`, {
//         recectlyItemInfo: contact_info,
//         recentlyItemTime: `${
//           new Date().getUTCHours() + 2
//         }:${new Date().getUTCMinutes()}`,
//       });

//       return contact_info;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const removeFromRecentlyDailed = createAsyncThunk(
//   'recentlyDailed/remove_from_recently_dailed',
//   async (contact_id, thunkApi) => {
//     try {
//       await axios.delete(`recently_dailed/${contact_id}`);
//       return contact_id;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const getRecentlyDailed = createAsyncThunk(
//   'recentlyDailed/get_recently_dailed',
//   async (_, thunkApi) => {
//     try {
//       const { data } = await axios.get(`recently_dailed`);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

const ContactsSlice = createSlice({
  name: 'contacts',

  initialState: contactInitialState,

  reducers: {
    filterContactList(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });

    builder
      .addCase(addContact.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
      });

    builder
      .addCase(removeContact.pending, (state, { payload }) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(removeContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== payload
        );
      })
      .addCase(removeContact.rejected, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = payload;
      });

    builder
      .addCase(addToFavorite.pending, (state, { payload }) => {
        state.contacts.isLoading = true;
      })
      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;

        state.contacts.items.map(item =>
          item.id === payload ? (item.isFavorite = !item.isFavorite) : 0
        );
      })
      .addCase(addToFavorite.rejected, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = payload;
      });
  },
});

// const RecentlyDailedSlice = createSlice({
//   name: 'recentlyDailed',

//   initialState: recentlyDailedInitialState,
//   reducers: {
//     //save local history of calls
//     addToLocalRecentlyArray(state, { payload }) {
//       state.recentlyArray.push(payload);
//     },
//     filterRecentlyDailedList(state, { payload }) {
//       state.filter = payload;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(getRecentlyDailed.pending, (state, { payload }) => {
//         state.recentlyDailed.isLoading = true;
//         state.recentlyDailed.error = null;
//       })
//       .addCase(getRecentlyDailed.fulfilled, (state, { payload }) => {
//         state.recentlyDailed.isLoading = false;
//         state.recentlyDailed.items = payload;
//       })
//       .addCase(getRecentlyDailed.rejected, (state, { payload }) => {
//         state.recentlyDailed.isLoading = false;
//         state.recentlyDailed.error = payload;
//       });

//     builder
//       .addCase(removeFromRecentlyDailed.pending, (state, { payload }) => {
//         state.recentlyDailed.isLoading = true;
//         state.recentlyDailed.error = null;
//       })
//       .addCase(removeFromRecentlyDailed.fulfilled, (state, { payload }) => {
//         state.recentlyDailed.isLoading = false;
//         state.recentlyDailed.items = state.recentlyDailed.items.filter(
//           item => item.id !== payload
//         );
//       })
//       .addCase(removeFromRecentlyDailed.rejected, (state, { payload }) => {
//         state.recentlyDailed.isLoading = false;
//         state.recentlyDailed.error = payload;
//       });
//   },
// });
export const { filterContactList } = ContactsSlice.actions;

// export const { filterRecentlyDailedList } = RecentlyDailedSlice.actions;

export const contactsReducer = ContactsSlice.reducer;

// export const recentlyDailedReducer = RecentlyDailedSlice.reducer;
