import React, { useState, useEffect } from 'react';
import styles from './InvoiceForm.module.css';

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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.field}>
        <label className={styles.label}>Customer</label>
        <input className={styles.input} value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} required />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Due date</label>
        <input type="date" className={styles.dateInput} value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
      </div>

      <div className={styles.itemsHeader}>Items</div>
      {form.items.map((it, idx) => (
        <div key={idx} className={styles.itemRow}>
          <input className={styles.itemInput} placeholder="description" value={it.description} onChange={e => updateItem(idx, 'description', e.target.value)} required />
          <input className={styles.itemInput} type="number" min="1" value={it.qty} onChange={e => updateItem(idx, 'qty', Number(e.target.value))} />
          <input className={styles.itemInput} type="number" min="0" step="0.01" value={it.price} onChange={e => updateItem(idx, 'price', Number(e.target.value))} />
          <button type="button" className={styles.removeBtn} onClick={() => removeItem(idx)}>✕</button>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={addItem}>Add item</button>

      <button type="submit" className={styles.saveBtn}>Save Invoice</button>
    </form>
  );
}
