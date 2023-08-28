import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  TTodo,
  editModal,
  editUser,
  handleChangeCity,
  handleChangeDes,
  handleChangeEditCity,
  handleChangeEditDes,
  handleChangeEditMail,
  handleChangeEditPhone,
  handleChangeEditTitle,
  handleChangeMail,
  handleChangePhone,
  handleChangeTitle,
  openModal,
  setMoEditdal,
  setModal,
} from "./reducers/todoSlice";
import { delTodos, getTodos, postTodos, putTodos } from "./api/todos";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import user from "./assets/user.png";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function App() {
  const dispatch = useAppDispatch();
  const list = useAppSelector<TTodo[]>((state) => state.todo.list);
  const title = useAppSelector<string>((state) => state.todo.title);
  const status = useAppSelector<string>((state) => state.todo.status);
  const textD = useAppSelector<string>((state) => state.todo.textD);
  const textmail = useAppSelector<string>((state) => state.todo.textmail);
  const textcity = useAppSelector<string>((state) => state.todo.textcity);
  const textnumber = useAppSelector<number>((state) => state.todo.textnumber);
  const modal = useAppSelector<boolean>((state) => state.todo.modal);
  const modalka = useAppSelector<boolean>((state) => state.todo.modalka);
  const modalEdit = useAppSelector<boolean>((state) => state.todo.modalEdit);
  const setTitle = useAppSelector<string>((state) => state.todo.setTitle);
  const setsetTextD = useAppSelector<string>((state) => state.todo.setTextD);
  const setTextmail = useAppSelector<string>((state) => state.todo.setTextmail);
  const setTextcity = useAppSelector<string>((state) => state.todo.setTextcity);
  const idx = useAppSelector<number>((state) => state.todo.idx);
  const settextnumber = useAppSelector<number>(
    (state) => state.todo.settextnumber
  );

  // const editModal = useAppSelector<boolean>((state) => state.todo.editModal);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (status === "loading") {
    return <div>loading...</div>;
  }
  if (status === "error") {
    return <div>Something went wrong </div>;
  }

  return (
    <>
      <div>
        <div className="top flex justify-around py-[50px ">
          <div className="name">
            <h1 className="font-bold text-[26px]">User-List</h1>
          </div>
          <div className="btn mr-[50px]">
            <button
              placeholder="Name"
              onClick={() => dispatch(openModal())}
              className=" border-2 border-black py-[10px] px-[20px]  rounded-xl"
            >
              Add
            </button>
          </div>
        </div>
        <div className="texts_icons">
          <table className="border-[1px] border-[#fff] w-[1300px] m-[0_auto]">
            <tr className=" flex justify-between items-center gap-[20px]  bg-[#f3f3f3]  py-[17px] px-[20px]">
              <td className="w-[245px]">
                <h3 className="flex items-center gap-[10px] ml-[50px] text-[#40464C] text-[19px] font-[500] ">
                  Name
                </h3>
              </td>
              <td className="w-[145px]">
                <h3 className="flex items-center gap-[10px] text-[#40464C] text-[19px] font-[500]">
                  City
                </h3>
              </td>
              <td className="w-[120px]">
                <h2 className="flex items-center gap-[10px] text-[#40464C] text-[19px] font-[500]">
                  Status
                </h2>
              </td>
              <td className="">
                <h3 className="flex items-center gap-[10px] text-[#40464C] text-[19px] font-[500] w-[120px] ml-[30px]">
                  Phone
                </h3>
              </td>
              <td className="flex items-center gap-[20px] w-[70px]"></td>
            </tr>
          </table>
        </div>

        {modal ? (
          <div className="modal ">
            <div className="modal-content">
              <span
                onClick={() => dispatch(setModal())}
                className="text-[red] font-bold float-right relative  mr-[25px] text-[25px] top-[-20px]"
              >
                X
              </span>
              <input
                placeholder="Name"
                type="text"
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeTitle(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px] ml-[40px] "
              />
              <input
                placeholder="Surname"
                type="text"
                value={textD}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeDes(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px]"
              />
              <input
                placeholder="e-Mail"
                type="text"
                value={textmail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeMail(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px]"
              />
              <input
                placeholder="Number Phone"
                type="text"
                value={textnumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangePhone(event.target.value))
                }
                className="border-2 border-black py-[5px]"
              />
              <input
                type="text"
                placeholder="City"
                value={textcity}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeCity(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px]"
              />
              <div className="btn">
                <button
                  onClick={() => {
                    const todo: TTodo = {
                      title: title,
                      description: textD,
                      mail: textmail,
                      city: textcity,
                      phone: textnumber,
                      completed: false,
                    };
                    console.log(todo);

                    dispatch(postTodos(todo));
                    dispatch(setModal());
                  }}
                  className="border-2 border-black py-[10px] px-[10px]"
                >
                  addUser
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {modalEdit ? (
          <div className="modal ">
            <div className="modal-content">
              <span
                onClick={() => dispatch(setMoEditdal())}
                className="text-[red] font-bold float-right relative  mr-[25px] text-[25px] top-[-20px]"
              >
                X
              </span>
              <input
                placeholder="Name"
                type="text"
                value={setTitle}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeEditTitle(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px] ml-[40px] "
              />
              <input
                placeholder="Surname"
                type="text"
                value={setsetTextD}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeEditDes(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px]"
              />
              <input
                placeholder="e-Mail"
                type="text"
                value={setTextmail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeEditMail(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px]"
              />
              <input
                placeholder="Number Phone"
                type="text"
                value={settextnumber}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeEditPhone(event.target.value))
                }
                className="border-2 border-black py-[5px]"
              />
              <input
                type="text"
                placeholder="City"
                value={setTextcity}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(handleChangeEditCity(event.target.value))
                }
                className="border-2 border-black py-[5px] my-[5px]"
              />
              <div className="btn">
               
                <button
                  onClick={() => {
                    const todo: TTodo = {
                      id: idx,
                      title: setTitle,
                      description: setsetTextD,
                      mail: setTextmail,
                      city: setTextcity,
                      phone: settextnumber,
                      completed: false,
                    };

                    dispatch(putTodos(todo));

                    dispatch(setMoEditdal());
                  }}
                  className="border-2 border-black py-[10px] px-[10px]"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {list.map((elem: TTodo) => {
          return (
            <div key={elem.id} className="flex justify-center items-center">
              <table className=" w-[1300px]  border-2 border-black">
                <tr className="flex justify-between items-center">
                  <td className="w-[270px]  ">
                    <div className="flex items-center gap-[10px]">
                      <div className="img">
                        <img
                          src={user}
                          alt=""
                          className="w-[50px] rounded-2xl"
                        />
                      </div>
                      <div className="text1 flex flex-col">
                        <div className="flex items-center gap-[5px]">
                          <h1 className="">
                            {elem.completed ? <s>{elem.title}</s> : elem.title}
                          </h1>
                          <h1>
                            {elem.completed ? (
                              <s>{elem.description}</s>
                            ) : (
                              elem.description
                            )}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-sm text-gray-500">
                            {elem.completed ? <s>{elem.mail}</s> : elem.mail}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="mr-[120px] ">
                    <h1>{elem.completed ? <s>{elem.city}</s> : elem.city}</h1>
                  </td>
                  <td className="mr-[120px] ">
                    <h1>ACTIVE</h1>
                  </td>
                  <td className=" ">
                    <h1>{elem.completed ? <s>{elem.phone}</s> : elem.phone}</h1>
                  </td>
                  <td className=" ">
                    {/* <button
                      onClick={() => {
                        if (elem.id) {
                          dispatch(delTodos(elem.id));
                        }
                      }}
                    >
                      delete
                    </button> */}
                    <DeleteIcon
                      color="error"
                      onClick={() => {
                        if (elem.id) {
                          dispatch(delTodos(elem.id));
                        }
                      }}
                    />
                    <div className="icon inline-block ml-[20px]">
                      <EditIcon
                        onClick={() => {
                          dispatch(handleChangeEditTitle(elem.title));
                          dispatch(handleChangeEditDes(elem.description));
                          dispatch(handleChangeEditMail(elem.mail));
                          dispatch(handleChangeEditPhone(elem.phone));
                          dispatch(handleChangeEditCity(elem.city));
                          dispatch(editModal(elem.id));
                        }}
                      />
                    </div>
                    {/* <button
                      
                      className="ml-[10px]"
                    >
                      Edit
                    </button> */}
                  </td>
                  <td></td>
                </tr>
              </table>
              {/* <input
                type="checkbox"
                checked={elem.completed}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const complete: TTodo = { ...elem };
                  complete.completed = event.target.checked;
                  dispatch(putTodos(complete));
                }}
              /> */}
            </div>
          );
        })}

        {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={modalka}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu> */}
      </div>
    </>
  );
}

export default App;
