
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EvaluationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/interview/evaluate/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note, commentaire, evaluatorID: "ID_DU_RECRUTEUR" })
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setMessage('✅ Évaluation enregistrée !');
          // Optionnel : rediriger après quelques secondes
          setTimeout(() => navigate('/interview/all'), 2000);
        } else {
          setMessage(result.error || '❌ Erreur lors de l\'évaluation');
        }
      })
      .catch(() => setMessage('❌ Erreur réseau ou serveur'));
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Évaluer l'entretien</h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded my-4">
        <label>Note (1 à 5) :</label>
        <input
          type="number"
          min="1"
          max="5"
          value={note}
          onChange={e => setNote(e.target.value)}
          required
          className="border p-2 mx-2"
        />
        <label>Commentaire :</label>
        <textarea
          value={commentaire}
          onChange={e => setCommentaire(e.target.value)}
          className="border p-2 w-full my-2"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Évaluer</button>
      </form>
      {message && (
        <div className="mt-4 text-green-600 font-bold">{message}</div>
      )}
    </div>
  );
};