const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function fetchInvoices() {
  const r = await fetch(`${base}/invoices`);
  return r.json();
}
export async function createInvoice(data) {
  const r = await fetch(`${base}/invoices`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
  return r.json();
}
export async function updateInvoice(id, data) {
  const r = await fetch(`${base}/invoices/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
  return r.json();
}
export async function deleteInvoice(id) {
  const r = await fetch(`${base}/invoices/${id}`, { method: 'DELETE' });
  return r;
}
