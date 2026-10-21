import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', age: '', portfolio: '', workshop: '',
  });
  const [errors, setErrors] = useState({});
  const [registrations, setRegistrations] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main>
      <h1>Workshop Registration</h1>
      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
      </form>
    </main>
  );
}