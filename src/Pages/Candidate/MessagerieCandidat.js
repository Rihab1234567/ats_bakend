// Candidate/MessagerieCandidat.js
import React, { useState, useEffect } from 'react';

function MessagerieCandidat({ candidatId, sender }) {
  const [messages, setMessages] = useState([]);
  const [contenu, setContenu] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/message/${candidatId}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [candidatId]);

  const envoyerMessage = async () => {
    await fetch('http://localhost:8080/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidatId, sender, contenu })
    });
    setContenu('');
    fetch(`http://localhost:8080/api/message/${candidatId}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  };

  return (
    <div>
      <h3>Messagerie avec le recruteur</h3>
      <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ccc', marginBottom: 10 }}>
        {messages.map(msg => (
          <div key={msg._id}>
            <b>{msg.sender}:</b> {msg.contenu} <i>({new Date(msg.date).toLocaleString()})</i>
          </div>
        ))}
      </div>
      <input
        value={contenu}
        onChange={e => setContenu(e.target.value)}
        placeholder="Votre message"
      />
      <button onClick={envoyerMessage}>Envoyer</button>
    </div>
  );
}

export default MessagerieCandidat;