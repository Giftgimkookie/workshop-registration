import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', age: '', portfolio: '', workshop: '',
  });
  const [errors, setErrors] = useState({});
  const [registrations, setRegistrations] = useState([]);

  return (
    <main>
      <h1>Workshop Registration</h1>
    </main>
  );
}