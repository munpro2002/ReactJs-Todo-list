import React, { Fragment } from "react";
import { useState, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AddTodoForm from "./components/AddTodoForm";
import TodosStatus from "./components/TodosStatus";
import TodosItem from "./components/TodosItem";
import TodosEmptyList from "./components/TodosEmptyList";

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
    const addedTodos = [
      { id: payload.id, task: payload.task, status: false },
      ...state,
    ];
    localStorage.setItem("storageTodos", JSON.stringify(addedTodos));
    return addedTodos;
  } else if (type === actionType.DELETETODO) {
    const deletedTodos = state.filter((todo) => todo.id !== payload);
    localStorage.setItem("storageTodos", JSON.stringify(deletedTodos));
    return deletedTodos;
  } else if (type === actionType.EDITTODO) {
    const index = state.findIndex((todo) => todo.id === payload.id);
    const newState = state;
    newState[index].task = payload.task ? payload.task : state[index].task;
    newState[index].status = payload.status
      ? state[index].status
      : !state[index].status;
    localStorage.setItem("storageTodos", JSON.stringify(newState));
    return newState;
  }
  return state;
};

function App() {
  const inputRef: any = React.useRef<HTMLInputElement>();
  const renameInputRef: any = React.useRef<HTMLInputElement>();

  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem("storageTodos") || "[]")
  );

  const [todosStatus, setTodosStatus] = useState({
    all: true,
    pending: false,
    completed: false,
  });

  const [showModal, setShowModal] = useState({
    id: -1,
  });

  const changeStatusHandler = (key: any) => {
    if (key === "all") {
      setTodosStatus({
        all: true,
        pending: false,
        completed: false,
      });
    } else if (key === "pending") {
      setTodosStatus({
        all: false,
        pending: true,
        completed: false,
      });
    } else if (key === "completed") {
      setTodosStatus({
        all: false,
        pending: false,
        completed: true,
      });
    }
  };

  const addTodoHandler = (event: any) => {
    event.preventDefault();
    const idForNewTodo: number = Math.random();

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
      payload: { id: idForNewTodo, task: newTodo },
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
  if (todosStatus.pending === true) {
    renderTodos = todos.filter((todo) => todo.status === false);
  } else if (todosStatus.completed === true) {
    renderTodos = todos.filter((todo) => todo.status === true);
  }

  return (
    <Fragment>
      <ToastContainer newestOnTop={true} />
      <Header />
      <main className="mx-auto max-w-[900px] px-8 mt-[1.5rem]">
        <AddTodoForm onAddTodo={addTodoHandler} ref={inputRef} />
        <TodosStatus
          onChangeStatus={changeStatusHandler}
          todosStatus={todosStatus}
        />
        {renderTodos.length > 0 && (
          <ul>
            {renderTodos.map((todo) => (
              <TodosItem
                key={todo.id}
                ref={renameInputRef}
                onShowModal={showModalHandler}
                todo={todo}
                isShowModal={showModal}
                onDeleteTodo={deleteTodoHandler}
                onEditNameTodo={editNameTodoHandler}
                onEditStatusTodo={editStatusTodoHandler}
              />
            ))}
          </ul>
        )}
        <TodosEmptyList renderTodos={renderTodos} todosStatus={todosStatus} />
      </main>
    </Fragment>
  );
}

export default App;
