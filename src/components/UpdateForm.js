import { useState } from "react";

function UpdateForm({setTodoList , updateProdId}) {
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
        if(setTodoList){
            setTodoList(data.updatedTodoList)
        }
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div>
      <form onSubmit={updateTask}>
        <label>
          Enter Name:
          <input type="text" onChange={(e) => setUpdatedName(e.target.value)} />
        </label>

        <label>
          Enter Date:
          <input type="date" onChange={(e) => setUpdatedDate(e.target.value)} />
        </label>

        <label>
          Enter Description:
          <input type="text" onChange={(e) => setUpdatedDesc(e.target.value)} />
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

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UpdateForm;
