import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://655f2569879575426b44a797.mockapi.io/';

const recentlyDailedInitialState = {
  recentlyDailed: {
    items: [],
    isLoading: false,
    error: null,
  },
  recentlyArray: [],
  filter: '',
};

export const addToRecentlyDailed = createAsyncThunk(
  'recentlyDailed/add_to_recently_dailed',
  async (contact_info, thunkApi) => {
    try {
      await axios.post(`recently_dailed`, {
        recectlyItemInfo: contact_info,
        recentlyItemTime: `${
          new Date().getUTCHours() + 2
        }:${new Date().getUTCMinutes()}`,
      });

      return contact_info;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeFromRecentlyDailed = createAsyncThunk(
  'recentlyDailed/remove_from_recently_dailed',
  async (contact_id, thunkApi) => {
    try {
      await axios.delete(`recently_dailed/${contact_id}`);
      return contact_id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getRecentlyDailed = createAsyncThunk(
  'recentlyDailed/get_recently_dailed',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`recently_dailed`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const RecentlyDailedSlice = createSlice({
  name: 'recentlyDailed',

  initialState: recentlyDailedInitialState,
  reducers: {
    //save local history of calls
    addToLocalRecentlyArray(state, { payload }) {
      state.recentlyArray.push(payload);
    },
    filterRecentlyDailedList(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRecentlyDailed.pending, (state, { payload }) => {
        state.recentlyDailed.isLoading = true;
        state.recentlyDailed.error = null;
      })
      .addCase(getRecentlyDailed.fulfilled, (state, { payload }) => {
        state.recentlyDailed.isLoading = false;
        state.recentlyDailed.items = payload;
      })
      .addCase(getRecentlyDailed.rejected, (state, { payload }) => {
        state.recentlyDailed.isLoading = false;
        state.recentlyDailed.error = payload;
      });

    builder
      .addCase(removeFromRecentlyDailed.pending, (state, { payload }) => {
        state.recentlyDailed.isLoading = true;
        state.recentlyDailed.error = null;
      })
      .addCase(removeFromRecentlyDailed.fulfilled, (state, { payload }) => {
        state.recentlyDailed.isLoading = false;
        state.recentlyDailed.items = state.recentlyDailed.items.filter(
          item => item.id !== payload
        );
      })
      .addCase(removeFromRecentlyDailed.rejected, (state, { payload }) => {
        state.recentlyDailed.isLoading = false;
        state.recentlyDailed.error = payload;
      });
  },
});

export const { filterRecentlyDailedList } = RecentlyDailedSlice.actions;

export const recentlyDailedReducer = RecentlyDailedSlice.reducer;
