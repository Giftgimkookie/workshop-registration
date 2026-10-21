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
                <label htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email"
          value={form.email} onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          required pattern="\+?[0-9\s\-]{7,15}"
          placeholder="+256 700 000000"
        />

        <label htmlFor="date">Workshop date</label>
        <input
          id="date" name="date" type="date"
          value={form.date} onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          id="age" name="age" type="number"
          value={form.age} onChange={handleChange}
          required min="16" max="100"
        />

        <label htmlFor="portfolio">Portfolio URL (optional)</label>
        <input
          id="portfolio" name="portfolio" type="url"
          value={form.portfolio} onChange={handleChange}
          placeholder="https://"
        />

        <label htmlFor="workshop">Workshop</label>
        <select
          id="workshop" name="workshop"
          value={form.workshop} onChange={handleChange}
          required
        >
          <option value="">— Select —</option>
          <option>React Basics</option>
          <option>State & Events</option>
          <option>Forms & Validation</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </main>
  );
}