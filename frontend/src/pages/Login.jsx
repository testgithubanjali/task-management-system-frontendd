import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("role", res.data.user.role);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      alert(err.response.data.message);
    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

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

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;