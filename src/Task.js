import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";
import UpdateForm from "./components/UpdateForm";
import styles from "./task.module.css";

function Task() {
  const location = useLocation();
  const [task, setTask] = useState();
  const [show, setShow] = useState(false);

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
        setTask(data);
      })
      .catch((err) => err.message);
  }, [location.state.taskId]);

  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <div className={styles["main-container"]}>
      <div className={styles["task-container"]}>
        
        {task && (
          <div className={styles['task']}>
            <div><span className={styles['task-title']}> Name : </span>{task.name} </div>
            <div><span className={styles['task-title']}>Task ID : </span>{location.state.taskId}</div>
            <div><span className={styles['task-title']}>Description : </span>{task.description}</div>
            <div><span className={styles['task-title']}>Status : </span>{task.status}</div></div>)}

            { task && ( 
            <div className={styles['button-container']}>
              <DeleteButton taskId={task._id} />
              <button
                onClick={() => {
                  setShow((value) => !value);
                }}
                className={styles["update-btn"]}
              >
                Update Task
              </button>

              
              {show && (
                <UpdateForm
                  updateProdId={task._id}
                  open={show}
                  isClosed={() => setShow(false)}
                />
              )}
              
            </div>
          
        )}
      </div>
    </div>
  );
}

export default Task;
