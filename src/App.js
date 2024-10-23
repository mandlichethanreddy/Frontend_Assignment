import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [sortBy, setSortBy] = useState('priority'); 
  const [grouping, setGrouping] = useState('status'); 
  

  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        console.log('API Response:', response.data);
        setTickets(response.data.tickets);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority; 
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title); 
      }
      return 0;
    });
  };

  const groupTickets = (tickets) => {
    const grouped = {};

    if (grouping === 'status') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.status]) grouped[ticket.status] = [];
        grouped[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.userId]) grouped[ticket.userId] = [];
        grouped[ticket.userId].push(ticket);
      });
    } else if (grouping === 'priority') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.priority]) grouped[ticket.priority] = [];
        grouped[ticket.priority].push(ticket);
      });
    }

    
    Object.keys(grouped).forEach(key => {
      grouped[key] = sortTickets(grouped[key]);
    });

    return grouped;
  };

  const groupedTickets = groupTickets(tickets); 

  return (
    <div className="App">

      
      

      <div>
        <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
          <option value="status">Group by Status</option>
          <option value="user">Group by User</option>
          <option value="priority">Group by Priority</option>
        </select>
      </div>

      <div>
        <button onClick={() => setSortBy('priority')}>Sort by Priority</button>
        <button onClick={() => setSortBy('title')}>Sort by Title</button>
      </div>

      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <div key={key} className="kanban-column">
            <h2>{key}</h2>
            {tickets.length > 0 ? (
              tickets.map(ticket => (
                <Card key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <p>No tickets in this category</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;