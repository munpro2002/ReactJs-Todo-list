import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import classes from "../App.module.css";

type todosStatusProps = {
  onChangeStatus: (key: string) => void;
  todosStatus: { all: boolean; pending: boolean; completed: boolean };
};

const TodosStatus = (props: todosStatusProps) => {
  return (
    <ul className="flex text-white gap-1 my-[1rem]">
      <li
        onClick={props.onChangeStatus.bind(null, "all")}
        className={`${
          props.todosStatus.all === true ? classes["active-status"] : ""
        } w-[33.333%] flex justify-center items-center p-[1.25rem] rounded-[6px] cursor-pointer hover:bg-[#ffffff0d]`}
      >
        <FontAwesomeIcon icon={faListUl} />
        <span className="pl-[1rem]">All</span>
      </li>
      <li
        onClick={props.onChangeStatus.bind(null, "pending")}
        className={`${
          props.todosStatus.pending === true ? classes["active-status"] : ""
        } w-[33.333%] flex justify-center items-center p-[1.25rem] rounded-[6px] cursor-pointer hover:bg-[#ffffff0d]`}
      >
        <FontAwesomeIcon icon={faClock} />
        <span className="pl-[1rem]">Pending</span>
      </li>
      <li
        onClick={props.onChangeStatus.bind(null, "completed")}
        className={`${
          props.todosStatus.completed === true ? classes["active-status"] : ""
        } w-[33.333%] flex justify-center items-center p-[1.25rem] rounded-[6px] cursor-pointer hover:bg-[#ffffff0d]`}
      >
        <FontAwesomeIcon icon={faCheck} />
        <span className="pl-[1rem]">Completed</span>
      </li>
    </ul>
  );
};

export default TodosStatus;
