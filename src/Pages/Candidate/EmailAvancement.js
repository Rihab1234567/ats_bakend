// Candidate/EmailAvancement.js
import React, { useState } from 'react';

function EmailAvancement({ candidatId }) {
  const [type, setType] = useState('convocation');

  const envoyerEmail = async () => {
    await fetch('http://localhost:8080/api/email/avancement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidatId, type })
    });
    alert('Email envoyé !');
  };

  return (
    <div>
      <h3>Notifier le candidat</h3>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="convocation">Convocation à un entretien</option>
        <option value="rejet">Rejet</option>
        <option value="autre">Autre</option>
      </select>
      <button onClick={envoyerEmail}>Envoyer Email</button>
    </div>
  );
}

export default EmailAvancement;