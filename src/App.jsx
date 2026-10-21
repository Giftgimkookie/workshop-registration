import { useState } from 'react';

function validate(f) {
  const errors = {};

  if (!f.name.trim()) errors.name = 'Name is required.';

  if (!f.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    errors.email = 'Enter a valid email, e.g. name@example.com.';

  if (!f.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^\+?[0-9\s-]{7,15}$/.test(f.phone))
    errors.phone = 'Use 7–15 digits (spaces, dashes and a leading + are allowed).';

  const today = new Date().toISOString().split('T')[0];
  if (!f.date) errors.date = 'Choose a workshop date.';
  else if (f.date < today) errors.date = 'The date cannot be in the past.';

  if (f.age === '') errors.age = 'Age is required.';
  else if (!Number.isInteger(Number(f.age))) errors.age = 'Age must be a whole number.';
  else if (Number(f.age) < 16 || Number(f.age) > 100)
    errors.age = 'Age must be between 16 and 100.';

  if (f.portfolio.trim()) {
    try {
      const u = new URL(f.portfolio);
      if (!['http:', 'https:'].includes(u.protocol)) throw new Error();
    } catch {
      errors.portfolio = 'Enter a valid URL starting with http:// or https://.';
    }
  }

  if (!f.workshop) errors.workshop = 'Please select a workshop.';

  return errors;
}

const EMPTY_FORM = {
  name: '', email: '', phone: '', date: '', age: '', portfolio: '', workshop: '',
};

export default function App() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [registrations, setRegistrations] = useState([]);
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSuccess('');
      return;
    }

    const entry = { ...form, name: form.name.trim(), id: Date.now() };
    setRegistrations([...registrations, entry]);
    setSuccess(`${entry.name} is registered for ${entry.workshop}!`);
    setForm(EMPTY_FORM);
  }

  return (
    <main>
      <h1>Workshop Registration</h1>
      <form noValidate onSubmit={handleSubmit}>

        <label htmlFor="name">Full name</label>
        <input
          id="name" name="name" type="text"
          value={form.name} onChange={handleChange}
        />
        {errors.name && <p className="error" role="alert">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email"
          value={form.email} onChange={handleChange}
          required
        />
        {errors.email && <p className="error" role="alert">{errors.email}</p>}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          required pattern="\+?[0-9\s\-]{7,15}"
          placeholder="+256 700 000000"
        />
        {errors.phone && <p className="error" role="alert">{errors.phone}</p>}

        <label htmlFor="date">Workshop date</label>
        <input
          id="date" name="date" type="date"
          value={form.date} onChange={handleChange}
          required
        />
        {errors.date && <p className="error" role="alert">{errors.date}</p>}

        <label htmlFor="age">Age</label>
        <input
          id="age" name="age" type="number"
          value={form.age} onChange={handleChange}
          required min="16" max="100"
        />
        {errors.age && <p className="error" role="alert">{errors.age}</p>}

        <label htmlFor="portfolio">Portfolio URL (optional)</label>
        <input
          id="portfolio" name="portfolio" type="url"
          value={form.portfolio} onChange={handleChange}
          placeholder="https://"
        />
        {errors.portfolio && <p className="error" role="alert">{errors.portfolio}</p>}

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
        {errors.workshop && <p className="error" role="alert">{errors.workshop}</p>}

        <button type="submit">Register</button>
        {success && <p className="success" role="status">{success}</p>}
      </form>

      <h2>Registrations ({registrations.length})</h2>
      {registrations.length === 0 && <p>No registrations yet.</p>}
      <div className="grid">
        {registrations.map((r) => (
          <article className="card" key={r.id}>
            <h3>{r.name}</h3>
            <p>{r.workshop} · {r.date}</p>
            <p>{r.email} · {r.phone}</p>
            <p>Age {r.age}</p>
          </article>
        ))}
      </div>
    </main>
  );
}