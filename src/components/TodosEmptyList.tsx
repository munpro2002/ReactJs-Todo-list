import React, { Fragment } from "react";
import classes from "../App.module.css";

const TodosEmptyList: React.FC<{
  todosStatus: { all: boolean; pending: boolean; completed: boolean };
  renderTodos: {
    id: number;
    task: string;
    status: boolean;
  }[];
}> = (props) => {
  const { todosStatus, renderTodos } = props;

  return (
    <Fragment>
      {renderTodos.length === 0 && todosStatus.all && (
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
      {renderTodos.length === 0 && todosStatus.pending && (
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
      {renderTodos.length === 0 && todosStatus.completed && (
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
    </Fragment>
  );
};

export default TodosEmptyList;
