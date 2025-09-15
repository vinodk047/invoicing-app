import React from 'react';

export default function InvoiceList({ invoices, onEdit, onDelete }) {
  return (
    <div>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Due</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.customer}</td>
              <td>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '-'}</td>
              <td>{inv.total}</td>
              <td>
                <button onClick={() => onEdit(inv)}>Edit</button>
                <button onClick={() => onDelete(inv.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}