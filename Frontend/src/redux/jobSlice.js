import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alljob: [],
  alladminjob: [],
  singlejob: null,
  application: [],
  searchquery:''
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJob: (state, action) => {
      state.alljob = action.payload;
    },

    setAllAdminJob: (state, action) => {
      state.alladminjob = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singlejob = action.payload;
    },

    setApplication: (state, action) => {
      state.application = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchquery = action.payload;
    },
    resetSearchQuery: (state) => {
  state.searchquery = "";
},

    clearJobs: (state) => {
      state.alljob = [];
      state.alladminjob = [];
      state.singlejob = null;
      state.application = [];
    },
  },
});

export const {
  setAllJob,
  resetSearchQuery,
  setAllAdminJob,
  setSingleJob,
  setApplication,
  clearJobs,
  setSearchQuery
} = jobSlice.actions;

export default jobSlice.reducer;