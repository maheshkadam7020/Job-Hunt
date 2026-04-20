import { createSlice } from "@reduxjs/toolkit";

const companiesData = localStorage.getItem("companies");


const initialState = {
  companies:
    companiesData && companiesData !== "undefined"
      ? JSON.parse(companiesData)
      : [],
  searchText:""    

};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
      localStorage.setItem(
        "companies",
        JSON.stringify(action.payload)
      );
    },

    setSearchText:(state,action)=>{
        state.searchText=action.payload;
    },

    clearCompanies: (state) => {
      state.companies = [];
      localStorage.removeItem("companies");
    },
  },
});

export const {
  setCompanies,
  clearCompanies,
  setSearchText,
} = companySlice.actions;

export default companySlice.reducer;