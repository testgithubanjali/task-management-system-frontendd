import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
  });

  // Fetch Tasks
  const fetchTasks = useCallback(async () => {

    try {

      const res = await API.get("/tasks/");

      const taskData = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      return taskData;

    } catch (err) {

      console.log(err);

      alert("Failed to fetch tasks");
      return [];
    }
  }, []);

  useEffect(() => {

    fetchTasks().then(setTasks);

  }, [fetchTasks]);

  // Handle Form Input
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create Task
  const createTask = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/tasks/", form);

      console.log("CREATE TASK RESPONSE:", res.data);

      alert("Task Created Successfully");

      // Refresh Tasks After Create
      fetchTasks().then(setTasks);

      // Reset Form
      setForm({
        title: "",
        description: "",
        status: "",
      });

    } catch (err) {

      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
        "Task Creation Failed"
      );
    }
  };

  // Delete Task
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      alert("Task Deleted");

      fetchTasks().then(setTasks);

    } catch (err) {

      console.log(err);

      alert("Delete Failed");
    }
  };

  // Logout
  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  console.log("TASK STATE:", tasks);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Navbar */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-gray-800">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-3 rounded-2xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Create Task Form */}
      <div className="bg-white p-10 rounded-3xl shadow-xl mb-10">

        <h2 className="text-4xl font-bold mb-8">
          Create Task
        </h2>

        <form
          onSubmit={createTask}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Task Title"
            onChange={handleChange}
            className="w-full border border-gray-300 p-5 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            name="description"
            value={form.description}
            placeholder="Task Description"
            onChange={handleChange}
            className="w-full border border-gray-300 p-5 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-black"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-5 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Status</option>

            <option value="pending">Pending</option>

            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white p-5 rounded-2xl text-xl font-semibold hover:bg-gray-800 transition"
          >
            Create Task
          </button>

        </form>

      </div>

      {/* Task Section */}
      <div className="mt-10">

        <h2 className="text-4xl font-bold mb-8">
          Your Tasks
        </h2>

        {
          tasks.length > 0 ? (

            <div className="grid md:grid-cols-3 gap-8">

              {
                tasks.map((task) => (

                  <div
                    key={task._id}
                    className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
                  >

                    <h2 className="text-2xl font-bold text-gray-800">
                      {task.title}
                    </h2>

                    <p className="mt-3 text-gray-600">
                      {task.description}
                    </p>

                    <div className="mt-5 flex justify-between items-center">

                      <span className="bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold">
                        {task.status}
                      </span>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))
              }

            </div>

          ) : (

            <p className="text-gray-500 text-xl">
              No tasks created yet
            </p>
          )
        }

      </div>

    </div>
  );
}

export default Dashboard;