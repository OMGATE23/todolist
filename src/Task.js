import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";
import UpdateForm from "./components/UpdateForm";

function Task() {
  const location = useLocation();
  const [task, setTask] = useState();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    fetch(
      "http://localhost:4000/api/v1/user/todolist/" + location.state.taskId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTask(data)
      })
      .catch((err) => err.message);
  }, [location.state.taskId]);

  useEffect(() => {
    console.log(task)
  } , [task])

  return (
    <div>
      The individual task
      {location.state.taskId}
      {task && <div>
        <div>Name : {task.name} </div>
        <div>Description : {task.description}</div>
        <div>Status : {task.status}</div>
        <UpdateForm updateProdId = {task._id} />
        <DeleteButton taskId = {task._id} />
      </div>}

      
      
      
    </div>
  );
}

export default Task;
