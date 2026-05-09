import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

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

    console.log(form);

    try {

      const res = await API.post(
        "/auth/register",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      alert(res.data.message);

      navigate("/");

    } catch (err) {

      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
        JSON.stringify(err.response?.data?.errors) ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-black via-gray-900 to-black">

      <div className="bg-white w-105 p-8 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
          >
            <option value="user">User</option>

            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?

          <Link
            to="/"
            className="text-black font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;