import React from "react";
import classes from "../App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Id } from "react-toastify";

type AddTodoFormProps = {
  onAddTodo: (event: any) => Id;
  ref: React.Ref<HTMLInputElement>;
};

const AddTodoForm: React.FC<AddTodoFormProps> = React.forwardRef(
  (props, ref) => {
    return (
      <form
        onSubmit={props.onAddTodo}
        className={`${classes["add-todo-box"]} flex gap-3 items-center p-2 border-[2px] border-[#414141] rounded-[8px] bg-[#ffffff06]`}
      >
        <span className="text-[#414141] pl-4">{">"}</span>
        <input
          ref={ref}
          className="flex-1 outline-none bg-transparent text-white caret-[#2279db] placeholder:text-[#414141] placeholder:font-bold"
          placeholder="What is on your mind..."
        />
        <button className="text-white h-[3.5rem] w-[3.5rem] bg-[#414141] rounded-[0.3rem] hover:opacity-90">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    );
  }
);

export default AddTodoForm;
