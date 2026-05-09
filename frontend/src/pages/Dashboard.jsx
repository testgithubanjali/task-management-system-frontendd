import { useCallback, useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
  });

  const fetchTasks = useCallback(async () => {

    try {

      const res = await API.get("/tasks/");

      return res.data;

    } catch (err) {

      console.log(err);

      return [];

    }
  }, []);

  useEffect(() => {

    fetchTasks().then(setTasks);

  }, [fetchTasks]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await API.post("/tasks/", form);

      alert("Task Created");

      fetchTasks().then(setTasks);

    } catch (err) {

      alert(err.response.data.message);
    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <div>

      <h1>Dashboard</h1>

      <form onSubmit={createTask}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="status"
          placeholder="Status"
          onChange={handleChange}
        />

        <br /><br />

        <button>Create Task</button>

      </form>

      <hr />

      {
        tasks.map((task) => (

          <div key={task.id}>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>{task.status}</p>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>

            <hr />

          </div>
        ))
      }
    </div>
  );
}

export default Dashboard;