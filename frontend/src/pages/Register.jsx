import { useState } from "react";
import API from "../services/api";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/register", form);

      alert(res.data.message);

    } catch (err) {

      alert(err.response.data.message);
    }
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <select name="role" onChange={handleChange}>

          <option value="user">User</option>

          <option value="admin">Admin</option>

        </select>

        <br /><br />

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default Register;