import { useContext } from "react";
import { TasksContext } from "../../contexts/TasksContext";
import { Task } from "./Task";
import "./taskList.scss";

export default function TaskList() {
  const { tasks } = useContext(TasksContext);

  return (
    <div className="container">
      <ul id="task-list">
        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              content={task.content}
              done={task.done}
              id={task.id}
            />
          ))}
      </ul>
    </div>
  );
}
