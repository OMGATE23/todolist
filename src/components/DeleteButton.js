import { useNavigate } from "react-router-dom";

function DeleteButton({taskId , setTodoList}){

  const navigate = useNavigate()
    function deleteTask(taskId) {
        let token = JSON.parse(localStorage.getItem("token"));
        let deleteURL =
          "http://localhost:4000/api/v1/user/todolist/deletetask/" + taskId;
    
        fetch(deleteURL, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if(setTodoList){
                setTodoList(data.updatedTodoList)
            }

            if(!setTodoList){
              navigate('/todolist')
            }
          }).catch(err => console.log(err.message))

        
      }
    return (
        <button onClick={() => deleteTask(taskId)}>Delete Task</button>
    )
}

export default DeleteButton