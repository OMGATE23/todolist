import { useEffect, useState } from "react";
import styles from "./updateForm.module.css";

function UpdateForm({ setTodoList, updateProdId, open, isClosed }) {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState();

  function updateTask(e) {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem("token"));

    const updateURL =
      "http://localhost:4000/api/v1/user/todolist/updatetask/" + updateProdId;

    fetch(updateURL, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: updatedName,
        description: updatedDesc,
        expectedCompletionDate: updatedDate,
        status: updatedStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (setTodoList) {
          setTodoList(data.updatedTodoList);
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className={styles["main-container"]}>
      <div className={styles["update-form"]}>
        <button className={styles['close-btn']} onClick={isClosed}> X </button>
        <form onSubmit={updateTask}>
          <label>
            <div>Enter Name:</div>

            <input
              type="text"
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </label>

          <label>
            <div>Enter Date:</div>
            <input
              type="date"
              onChange={(e) => setUpdatedDate(e.target.value)}
            />
          </label>

          <label>
            <div>Enter Description:</div>
            <input
              type="text"
              onChange={(e) => setUpdatedDesc(e.target.value)}
            />
          </label>

          <label>
            Enter Status
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="completed">completed</option>
              <option value="overdue">overdue</option>
            </select>
          </label>

          <button className={styles["submit-btn"]}>SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
