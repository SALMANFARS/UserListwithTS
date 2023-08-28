// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { TTodo } from "../reducers/todoSlice";
// //get
// export const getTodos = createAsyncThunk("todos/getTodos", async () => {
//     try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}todos`
//         );
//         const data = await response.json();
//         return data
//     } catch (error) {
//         console.log(error);
        
//     }
// });
// //post

// export const postTodos = createAsyncThunk("todos/postTodos", async (todo: TTodo, {dispatch}) => {
//   try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}todos`,{
//         method: "POST",
//         headers: {
//           "Content-Type": "applictaion/json",
//         },
//         body: JSON.stringify(todo),
//       });
//       const data = await response.json();
//       dispatch(getTodos())
//       return data
//   } catch (error) {
//     console.log(error);
//   }
// });
// //put

// export const putTodos = createAsyncThunk("todos/putTodos", async (todo: TTodo, {dispatch}) => {
//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL}todos/${todo.id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "applictaion/json",
//         },
//         body: JSON.stringify(todo),
//       }
//     );
//       const data = await response.json();
//       dispatch(getTodos());
//       return data
//   } catch (error) {
//     console.log(error);
//   }
// });

// //del

// export const delTodos = createAsyncThunk("todos/delTodos", async (id:number, {dispatch}) => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}todos/${id}`, {
//       method: "DELETE",
//     });
//       const data = await response.json();
//       dispatch(getTodos());
//       return data
//   } catch (error) {
//     console.log(error);
//   }
// });

import { createAsyncThunk } from "@reduxjs/toolkit";
import { TTodo } from "../reducers/todoSlice";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    const response = await fetch(`http://localhost:3000/todos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postTodos = createAsyncThunk(
  "todos/postTodos",
  async (todo: TTodo, { dispatch }) => {
    try {
      const response = await fetch(`http://localhost:3000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      dispatch(getTodos());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const putTodos = createAsyncThunk(
  "todos/putTodos",
  async (todo: TTodo, { dispatch }) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      dispatch(getTodos());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const delTodos = createAsyncThunk(
  "todos/delTodos",
  async (id: number, { dispatch }) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(getTodos());
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);