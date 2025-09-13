import React, { useState, useEffect } from 'react';

export default function InvoiceForm({ onSaved, editing }) {
  const [form, setForm] = useState({ customer: '', items: [{ description: '', qty: 1, price: 0 }], dueDate: '' });

  useEffect(() => { if (editing) setForm(editing); }, [editing]);

  function updateItem(index, field, value) {
    const copy = { ...form };
    copy.items = copy.items.map((it, i) => i === index ? { ...it, [field]: value } : it);
    setForm(copy);
  }

  function addItem() { setForm({ ...form, items: [...form.items, { description: '', qty: 1, price: 0 }] }); }
  function removeItem(i) { setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) }); }

  function handleSubmit(e) {
    e.preventDefault();
    const total = form.items.reduce((s, it) => s + (Number(it.qty) * Number(it.price || 0)), 0);
    onSaved({ ...form, total });
    setForm({ customer: '', items: [{ description: '', qty: 1, price: 0 }], dueDate: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div>
        <label>Customer</label>
        <input value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} required />
      </div>
      <div>
        <label>Due date</label>
        <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
      </div>

      <h4>Items</h4>
      {form.items.map((it, idx) => (
        <div key={idx} style={{display:'grid',gridTemplateColumns:'1fr 80px 100px 40px',gap:'8px',alignItems:'center'}}>
          <input placeholder="description" value={it.description} onChange={e => updateItem(idx, 'description', e.target.value)} required />
          <input type="number" min="1" value={it.qty} onChange={e => updateItem(idx, 'qty', Number(e.target.value))} />
          <input type="number" min="0" step="0.01" value={it.price} onChange={e => updateItem(idx, 'price', Number(e.target.value))} />
          <button type="button" onClick={() => removeItem(idx)}>✕</button>
        </div>
      ))}
      <div>
        <button type="button" onClick={addItem}>Add item</button>
      </div>

      <div style={{marginTop:12}}>
        <button type="submit">Save Invoice</button>
      </div>
    </form>
  );
}
