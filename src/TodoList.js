import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";
import UpdateForm from "./components/UpdateForm";
import styles from "./todoList.module.css";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  //Add task useState
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  // Update task useStates
  const [show, setShow] = useState(false);
  const [updateProdId, setUpdateProdId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:4000/api/v1/user/todolist", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.todoList);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function addTask(e) {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem("token"));
    let addTaskURL = "http://localhost:4000/api/v1/user/todolist/addtask";

    fetch(addTaskURL, {
      method: "POST",
      body: JSON.stringify({
        name: taskName,
        expectedCompletionDate: taskDate,
        description: taskDesc,
      }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTodoList(data.updatedList);
      })
      .catch((err) => console.log(err.message));
  }

  function handleLogout() {
    fetch("http://localhost:4000/api/v1/user/logout")
      .then((res) => {
        res.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <nav className={styles.navbar}>
        <h1>TO DO LIST</h1>
        <button onClick={handleLogout}>Logout!</button>
      </nav>
      <div className={styles["main-container"]}>
        <div className={styles["list-container"]}>
          <ul className={styles.todolist}>
            {todoList &&
              todoList.map((task) => {
                return (
                  <li key={task._id} className={styles.task}>
                    <div
                      onClick={() => {
                        navigate("/todolist/item", {
                          state: { taskId: task._id },
                        });
                      }}
                      className={styles["task-name"]}
                    >
                      {task.name}
                    </div>
                    <div className={styles["task-button-div"]}>
                      <DeleteButton
                        taskId={task._id}
                        setTodoList={setTodoList}
                      />
                      <button
                        onClick={() => {
                          setShow((value) => !value);
                          setUpdateProdId(task._id);
                        }}
                        className={styles["update-task-btn"]}
                      >
                        Update Task
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className={styles["addtask-form-container"]}>
          <h2>ADD TASK</h2>
          <form onSubmit={addTask}>
            <label>
              Name of Task:
              <input
                onChange={(e) => setTaskName(e.target.value)}
                type="text"
              />
            </label>

            <label>
              
              Date of completion:
              <input
                onChange={(e) => setTaskDate(e.target.value)}
                type="date"
              />
            </label>

            <label>
              Description:
              <input
                onChange={(e) => setTaskDesc(e.target.value)}
                type="text"
              />
            </label>

            <button className={styles["add-task-submit-btn"]}>Submit</button>
          </form>
        </div>
      </div>

      {show && (
        <UpdateForm
          updateProdId={updateProdId}
          setTodoList={setTodoList}
          open={show}
          isClosed={() => setShow(false)}
        />
      )}
    </div>
  );
}

export default TodoList;
