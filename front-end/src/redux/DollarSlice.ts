import { createSlice } from "@reduxjs/toolkit";
import { DolarRange } from "../types.global";
import { AppThunk, RootState } from "../strore";
import axios from "axios";
import { URL_HOST_PROD } from "../libs/url";

export interface DollarState {
  list: DolarRange[];
  loading: boolean;
}

const initialState: DollarState = {
  list: [],
  loading: true,
};

export const DollarSlice = createSlice({
  name: "dollar",
  initialState,
  reducers: {
    getDollar: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    putOneDollar: (state, action) => {
      const updatedList = state.list.map((dollar) => {
        if (dollar.id === action.payload.id) {
          return {
            ...dollar,
            value: action.payload.value,
          };
        } else {
          return dollar;
        }
      });
      state.list = updatedList;
      state.loading = false;
    },
    deleteMultipleDollar: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { getDollar, putOneDollar, deleteMultipleDollar, setLoading } =
  DollarSlice.actions;

export const listDollar = (state: RootState) => state.dollar.list;
export const loading = (state: RootState) => state.dollar.loading;

export const getAllDollar = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get(`${URL_HOST_PROD}/api/dollar-values`);
    dispatch(getDollar(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const editDollarById =
  (id: number, value: number | string | null): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const res = await axios.patch(
        `${URL_HOST_PROD}/api/dollar-values/${id}`,
        { value }
      );
      dispatch(putOneDollar(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteMultipleDollarById =
  (arrId: number[]): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const res = await axios.post(
        `${URL_HOST_PROD}/api/dollar-values/delete`,
        {
          ids: arrId,
        }
      );

      dispatch(deleteMultipleDollar(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export const searchDateDollarRange =
  (start_date: string, end_date: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const res = await axios.get(`${URL_HOST_PROD}/api/dollar-values`, {
        params: {
          start_date,
          end_date,
        },
      });
      dispatch(getDollar(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export default DollarSlice.reducer;
