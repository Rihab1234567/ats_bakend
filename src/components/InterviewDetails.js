import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/interview/${id}`)
      .then(res => res.json())
      .then(data => setInterview(data));
  }, [id]);

  if (!interview) return <div>Chargement...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        onClick={() => navigate('/interview/all')}
      >
        Liste des entretiens
      </button>

      {/* Lien vers la page d'évaluation dédiée */}
      <Link
        to={`/interview/${id}/evaluate`}
        className="ml-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        style={{ textDecoration: 'none' }}
      >
        Évaluer cet entretien
      </Link>

      <h1 className="text-2xl font-bold mb-4">Détails de l'entretien</h1>
      <p><b>Job ID :</b> {interview.jobID}</p>
      <p><b>Recruteur :</b> {interview.recruiterID}</p>
      <p><b>Candidat :</b> {interview.candidateID}</p>
      <p><b>Date :</b> {new Date(interview.interviewDate).toLocaleString()}</p>
      <p><b>Lieu :</b> {interview.location}</p>
      <p><b>Notes :</b> {interview.notes}</p>

      {/* (Optionnel) Afficher les évaluations existantes */}
      {interview.evaluations && interview.evaluations.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Évaluations précédentes :</h3>
          <ul>
            {interview.evaluations.map((evalItem, idx) => (
              <li key={idx} className="mb-2">
                <b>Note :</b> {evalItem.note} / 5<br />
                <b>Commentaire :</b> {evalItem.commentaire}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};