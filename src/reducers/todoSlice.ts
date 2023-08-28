import { createSlice, isAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { delTodos, getTodos, postTodos, putTodos } from "../api/todos";
import { message } from "antd";
import { act } from "react-dom/test-utils";


export type TTodo = {
    id?: number;
    title: string;
    description: string;
    mail: string;
    city: string;
    phone: number | string;
  completed: boolean;
  
    
}
interface CounterState {
  list: TTodo[];
  title: string;
  textD: string;
  textmail: string;
  textcity: string;
  textnumber: number;
  status: "loading" | "complete" | "error";
  modal: boolean;
  modalka: boolean;
  modalEdit: boolean;
  setTitle: string;
  setTextD: string;
  setTextmail: string;
  setTextcity: string;
  settextnumber: number;
  idx: number;
  menuModal: boolean;
  // editModal:boolean
}

const initialState: CounterState = {
  list: [],
  title: "",
  textD: "",
  textmail: "",
  textcity: "",
  textnumber: 0,
  status: "complete",
  modal: false,
  modalka: false,
  modalEdit: false,
  setTitle: "",
  setTextD: "",
  setTextmail: "",
  setTextcity: "",
  settextnumber: 0,
  idx: 0,
  menuModal: false,
  // editModal:false
};

export const todoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    handleChangeTitle(state: CounterState, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    openModal(state) {
      state.modal = true;
    },
    handleChangeDes(state: CounterState, action: PayloadAction<string>) {
      state.textD = action.payload;
    },
    handleChangeMail(state: CounterState, action: PayloadAction<string>) {
      state.textmail = action.payload;
    },
    handleChangePhone(state: CounterState, action: PayloadAction<number>) {
      state.textnumber = action.payload;
    },
    handleChangeCity(state: CounterState, action: PayloadAction<string>) {
      state.textcity = action.payload;
    },
    setModal(state: CounterState) {
      state.modal = false;
      state.title = "";
      state.textD = "";
      state.textcity = "";
      state.textmail = "";
      state.textnumber = 0;
    },

    handleChangeEditTitle(state: CounterState, action: PayloadAction<string>) {
      state.setTitle = action.payload;
    },
    handleChangeEditDes(state: CounterState, action: PayloadAction<string>) {
      state.setTextD = action.payload;
    },
    handleChangeEditMail(state: CounterState, action: PayloadAction<string>) {
      state.setTextmail = action.payload;
    },
    handleChangeEditPhone(state: CounterState, action: PayloadAction<number>) {
      state.settextnumber = action.payload;
    },
    handleChangeEditCity(state: CounterState, action: PayloadAction<string>) {
      state.setTextcity = action.payload;
    },

    editModal(state: CounterState, action) {
      state.modalEdit = true;
      state.idx = action.payload;
    },
    setMoEditdal(state: CounterState) {
      state.modalEdit = false;
      state.setTitle = "";
      state.setTextD = "";
      state.setTextmail = "";
      state.setTextcity = "";
      state.textnumber = 0;
    },
    openMenu(state: CounterState) {
      state.menuModal = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state: CounterState) => {
      state.status = "loading";
    });
    builder.addCase(
      getTodos.fulfilled,
      (state: CounterState, action: PayloadAction<TTodo[]>) => {
        state.status = "complete";
        state.list = action.payload;
      }
    );

    builder.addCase(getTodos.rejected, (state: CounterState) => {
      state.status = "error";
    });
    //post

    builder.addCase(postTodos.pending, (state: CounterState) => {
      state.status = "loading";
    });
    builder.addCase(
      postTodos.fulfilled,
      (state: CounterState, action: PayloadAction<TTodo>) => {
        state.status = "complete";
        message.success(
          `Todo with title: ${action.payload.title} was successfully added to the list `
        );
      }
    );

    builder.addCase(postTodos.rejected, (state: CounterState) => {
      state.status = "error";
    });
    //put

    builder.addCase(putTodos.pending, (state: CounterState) => {
      state.status = "loading";
    });
    builder.addCase(
      putTodos.fulfilled,
      (state: CounterState, action: PayloadAction<TTodo>) => {
        state.status = "complete";
        message.success(
          `Todo with title: ${action.payload.title} was successfully uptedded to the list `
        );
      }
    );

    builder.addCase(putTodos.rejected, (state: CounterState) => {
      state.status = "error";
    });
    //del

    builder.addCase(delTodos.pending, (state: CounterState) => {
      state.status = "loading";
    });
    builder.addCase(delTodos.fulfilled, (state: CounterState) => {
      state.status = "complete";
      message.success(`Todo  was successfully deleted from the list `);
    });

    builder.addCase(delTodos.rejected, (state: CounterState) => {
      state.status = "error";
    });
  },
});

export const {
  handleChangeTitle,
  openModal,
  handleChangeDes,
  handleChangeMail,
  handleChangePhone,
  handleChangeCity,
  setModal,
  editModal,
  handleChangeEditTitle,
  handleChangeEditDes,
  handleChangeEditMail,
  handleChangeEditPhone,
  handleChangeEditCity,
  setMoEditdal,
  openMenu,
  editUser,
} = todoSlice.actions;


export default todoSlice.reducer;
