import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import * as api from './api';

export default function App() {
  const [invoices, setInvoices] = useState([]);
  const [editing, setEditing] = useState(null);

  async function load() {
    try {
      const data = await api.fetchInvoices();
      setInvoices(data || []);
    } catch (err) {
      console.error('Failed to load invoices', err);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSaved(data) {
    try {
      if (editing) {
        await api.updateInvoice(editing.id, { ...editing, ...data });
        setEditing(null);
      } else {
        await api.createInvoice(data);
      }
      await load();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEdit(inv) { setEditing(inv); }
  async function handleDelete(id) { await api.deleteInvoice(id); await load(); }

  return (
    <div style={{display:'grid',gridTemplateColumns:'360px 1fr',gap:24,padding:24}}>
      <div>
        <h3>{editing ? 'Edit Invoice' : 'New Invoice'}</h3>
        <InvoiceForm onSaved={handleSaved} editing={editing} />
      </div>
      <div>
        <h3>Invoices</h3>
        <InvoiceList invoices={invoices} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
