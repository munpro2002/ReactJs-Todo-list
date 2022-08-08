import { Fragment } from "react";
import classes from "./App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faListUl,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useState, useRef, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./UI/Modal";

enum actionType {
  ADDTODO = "ADD",
  EDITTODO = "EDIT",
  DELETETODO = "DELETE",
}

interface TodoAction {
  type: actionType;
  payload: any;
}

const todosReducer = (
  state: Array<{ id: number; task: string; status: boolean }>,
  action: TodoAction
): Array<{ id: number; task: string; status: boolean }> => {
  const { type, payload } = action;
  if (type === actionType.ADDTODO) {
    return [{ id: payload.id, task: payload.task, status: false }, ...state];
  } else if (type === actionType.DELETETODO) {
    return state.filter((todo) => todo.id !== payload);
  } else if (type === actionType.EDITTODO) {
    const index = state.findIndex((todo) => todo.id === payload.id);
    const newState = state;
    newState[index].task = payload.task ? payload.task : state[index].task;
    newState[index].status = payload.status
      ? state[index].status
      : !state[index].status;
    return newState;
  }
  return state;
};

function App() {
  const inputRef: any = useRef();
  const renameInputRef: any = useRef();

  const [todos, dispatch] = useReducer(todosReducer, []);

  const [todoStatus, setTodoStatus] = useState({
    all: true,
    pending: false,
    completed: false,
  });

  const [showModal, setShowModal] = useState({
    id: -1,
  });

  const changeStatusHandler = (key: any) => {
    if (key === "all") {
      setTodoStatus({
        all: true,
        pending: false,
        completed: false,
      });
    } else if (key === "pending") {
      setTodoStatus({
        all: false,
        pending: true,
        completed: false,
      });
    } else if (key === "completed") {
      setTodoStatus({
        all: false,
        pending: false,
        completed: true,
      });
    }
  };

  const addTodoHandler = (event: any) => {
    event.preventDefault();
    const newTodo = inputRef.current.value;
    if (newTodo.trim() === "")
      return toast.error("Unvalid task", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    dispatch({
      type: actionType.ADDTODO,
      payload: { id: Math.random(), task: newTodo },
    });
    event.target.reset();
    return toast.success("Wow so easy!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const deleteTodoHandler = (id: number) => {
    dispatch({
      type: actionType.DELETETODO,
      payload: id,
    });

    return toast.warning("You've just deleted one task", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const editStatusTodoHandler = (id: number) => {
    dispatch({
      type: actionType.EDITTODO,
      payload: {
        id: id,
      },
    });
  };

  const editNameTodoHandler = (id: number) => {
    const changedName = renameInputRef.current.value;
    if (changedName.trim() === "")
      return toast.error("Unvalid task", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    dispatch({
      type: actionType.EDITTODO,
      payload: {
        id: id,
        task: changedName,
        status: true,
      },
    });

    setShowModal({ id: -1 });
  };

  const showModalHandler = (id: number) => {
    setShowModal({ id: id });
  };

  let renderTodos = todos;
  if (todoStatus.pending === true) {
    renderTodos = todos.filter((todo) => todo.status === false);
  } else if (todoStatus.completed === true) {
    renderTodos = todos.filter((todo) => todo.status === true);
  }

  return (
    <Fragment>
      <ToastContainer newestOnTop={true} />
      <header className="border-b-[2px] border-[#414141]">
        <div className="mx-auto max-w-[900px] px-8">
          <h1 className="text-white text-[2rem] leading-2 font-bold my-[22px]">
            Todomatic
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-[900px] px-8 mt-[1.5rem]">
        <form
          onSubmit={addTodoHandler}
          className={`${classes["add-todo-box"]} flex gap-3 items-center p-2 border-[2px] border-[#414141] rounded-[8px] bg-[#ffffff06]`}
        >
          <span className="text-[#414141] pl-4">{">"}</span>
          <input
            ref={inputRef}
            className="flex-1 outline-none bg-transparent text-white caret-[#2279db] placeholder:text-[#414141] placeholder:font-bold"
            placeholder="What is on your mind..."
          />
          <button className="text-white h-[3.5rem] w-[3.5rem] bg-[#414141] rounded-[0.3rem] hover:opacity-90">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
        <ul className="flex text-white gap-1 my-[1rem]">
          <li
            onClick={changeStatusHandler.bind(null, "all")}
            className={`${
              todoStatus.all === true ? classes["active-status"] : ""
            } w-[33.333%] flex justify-center items-center p-[1.25rem] rounded-[6px] cursor-pointer hover:bg-[#ffffff0d]`}
          >
            <FontAwesomeIcon icon={faListUl} />
            <span className="pl-[1rem]">All</span>
          </li>
          <li
            onClick={changeStatusHandler.bind(null, "pending")}
            className={`${
              todoStatus.pending === true ? classes["active-status"] : ""
            } w-[33.333%] flex justify-center items-center p-[1.25rem] rounded-[6px] cursor-pointer hover:bg-[#ffffff0d]`}
          >
            <FontAwesomeIcon icon={faClock} />
            <span className="pl-[1rem]">Pending</span>
          </li>
          <li
            onClick={changeStatusHandler.bind(null, "completed")}
            className={`${
              todoStatus.completed === true ? classes["active-status"] : ""
            } w-[33.333%] flex justify-center items-center p-[1.25rem] rounded-[6px] cursor-pointer hover:bg-[#ffffff0d]`}
          >
            <FontAwesomeIcon icon={faCheck} />
            <span className="pl-[1rem]">Completed</span>
          </li>
        </ul>
        {renderTodos.length > 0 && (
          <ul>
            {renderTodos.map((todo) => (
              <li
                key={todo.id}
                className={`${classes["todos-item"]} bg-transparent flex justify-between text-white pr-[0.6em] pl-[1em] py-[0.6em] mt-[0.5em] border-[1px] border-[rgba(255,255,255,0.2)] rounded-[0.5em]`}
              >
                {showModal.id === todo.id && (
                  <Modal onCloseModal={showModalHandler.bind(null, -1)}>
                    <div className="absolute z-10 bg-[#121212] p-[2em] rounded-[1em] min-w-[500px]">
                      <h2 className="text-white text-[1.5em] mb-[0.8em]">
                        Rename
                      </h2>
                      <p className="text-white">
                        Rename item <strong>{`"${todo.task}"`}</strong>
                      </p>
                      <input
                        ref={renameInputRef}
                        className="mt-[1em] w-full outline-none bg-[#ffffff0d] rounded-[0.5em] py-[0.5em] px-[1em] caret-white text-white border-[2px] border-[#fff3] focus:border-[#2279db] transition ease-in-out delay-300"
                        type="text"
                        placeholder="New name"
                      />
                      <div className="flex justify-end gap-2 pt-[1em] mt-[1em] border-t-[2px] border-[rgba(255,255,255,0.2)]">
                        <button
                          onClick={editNameTodoHandler.bind(null, todo.id)}
                          className="w-[90px] bg-[#2279db] text-black font-bold text-[1em] px-[1em] py-[0.5em] rounded-[0.5em]"
                        >
                          Rename
                        </button>
                        <button
                          onClick={showModalHandler.bind(null, -1)}
                          className="w-[90px] bg-[#ffffff1a] text-white text-[1em] px-[1em] py-[0.5em] rounded-[0.5em]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
                <div className="flex gap-4 items-center">
                  <input
                    type="checkbox"
                    onClick={editStatusTodoHandler.bind(null, todo.id)}
                    defaultChecked={todo.status}
                  />
                  <label>{todo.task}</label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={showModalHandler.bind(null, todo.id)}
                    className="w-[2.5em] h-[2.5em] bg-[#ffffff1a] rounded-[0.3em] cusor-pointer"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={deleteTodoHandler.bind(null, todo.id)}
                    className="w-[2.5em] h-[2.5em] bg-[#ffffff1a] rounded-[0.3em] cusor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {renderTodos.length === 0 && todoStatus.all && (
          <div
            className={`${classes["empty-state"]} h-[50vh] text-white flex justify-center flex-col items-center`}
          >
            <div className="opacity-30 text-[clamp(1rem,6rem,15vw)]">
              {"(^-^*)"}
            </div>
            <h2 className="mt-[2em] text-[1.5em]">It seems empty in here</h2>
            <p className="opacity-50 my-[1em]">
              There are no tasks to show for now. Consider adding some...
            </p>
          </div>
        )}
        {renderTodos.length === 0 && todoStatus.pending && (
          <div
            className={`${classes["empty-state"]} h-[50vh] text-white flex justify-center flex-col items-center`}
          >
            <div className="opacity-30 text-[clamp(1rem,6rem,15vw)]">
              {"(≧∇≦)ﾉ"}
            </div>
            <h2 className="mt-[2em] text-[1.5em]">Hooray! No pending tasks</h2>
            <p className="opacity-50 my-[1em]">
              {"You don't have any pending tasks for now. Enjoy :)"}
            </p>
          </div>
        )}
        {renderTodos.length === 0 && todoStatus.completed && (
          <div
            className={`${classes["empty-state"]} h-[50vh] text-white flex justify-center flex-col items-center`}
          >
            <div className="opacity-30 text-[clamp(1rem,6rem,15vw)]">
              {"(´･ω･`)?"}
            </div>
            <h2 className="mt-[2em] text-[1.5em]">
              Hmmm. I don't see any completed tasks
            </h2>
            <p className="opacity-50 my-[1em]">
              It seems you have not completed any tasks so far...
            </p>
          </div>
        )}
      </main>
    </Fragment>
  );
}

export default App;
