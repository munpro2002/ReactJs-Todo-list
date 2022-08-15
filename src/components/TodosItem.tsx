import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classes from "../App.module.css";
import Modal from "../UI/Modal";
import { Id } from "react-toastify";

const TodosItem: React.FC<{
  todo: { id: number; task: string; status: boolean };
  onShowModal: (id: number) => void;
  isShowModal: { id: number };
  onEditStatusTodo: (id: number) => void;
  onEditNameTodo: (id: number) => Id | undefined;
  onDeleteTodo: (id: number) => Id;
  ref: React.Ref<HTMLInputElement>;
}> = forwardRef((props, ref) => {
  const { todo, isShowModal } = props;

  return (
    <li
      key={todo.id}
      className={`${classes["todos-item"]} bg-transparent flex justify-between text-white pr-[0.6em] pl-[1em] py-[0.6em] mt-[0.5em] border-[1px] border-[rgba(255,255,255,0.2)] rounded-[0.5em]`}
    >
      {isShowModal.id === todo.id && (
        <Modal onCloseModal={props.onShowModal.bind(null, -1)}>
          <div className="absolute z-10 bg-[#121212] p-[2em] rounded-[1em] min-w-[500px]">
            <h2 className="text-white text-[1.5em] mb-[0.8em]">Rename</h2>
            <p className="text-white">
              Rename item <strong>{`"${todo.task}"`}</strong>
            </p>
            <input
              ref={ref}
              className="mt-[1em] w-full outline-none bg-[#ffffff0d] rounded-[0.5em] py-[0.5em] px-[1em] caret-white text-white border-[2px] border-[#fff3] focus:border-[#2279db] transition ease-in-out delay-300"
              type="text"
              placeholder="New name"
            />
            <div className="flex justify-end gap-2 pt-[1em] mt-[1em] border-t-[2px] border-[rgba(255,255,255,0.2)]">
              <button
                onClick={props.onEditNameTodo.bind(null, todo.id)}
                className="w-[90px] bg-[#2279db] text-black font-bold text-[1em] px-[1em] py-[0.5em] rounded-[0.5em]"
              >
                Rename
              </button>
              <button
                onClick={props.onShowModal.bind(null, -1)}
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
          onClick={props.onEditStatusTodo.bind(null, todo.id)}
          defaultChecked={todo.status}
        />
        <label>{todo.task}</label>
      </div>
      <div className="flex gap-2">
        <button
          onClick={props.onShowModal.bind(null, todo.id)}
          className="w-[2.5em] h-[2.5em] bg-[#ffffff1a] rounded-[0.3em] cusor-pointer"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={props.onDeleteTodo.bind(null, todo.id)}
          className="w-[2.5em] h-[2.5em] bg-[#ffffff1a] rounded-[0.3em] cusor-pointer"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
});

export default TodosItem;
