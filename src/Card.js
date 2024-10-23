import React from 'react';
import './Card.css';


const Card = ({ ticket }) => {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>User: {ticket.user}</p>
    </div>
  );
};

export default Card;