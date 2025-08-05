import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/interview/all')
      .then(res => res.json())
      .then(data => {
      console.log("Interviews reçus :", data);
      setInterviews(data);
    });
  }, []);

  if (!interviews.length) return <div>Chargement ou aucun entretien trouvé...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des entretiens</h1>
      <ul>
        {interviews.map(interview => (
          <li key={interview._id} className="mb-4 border-b pb-2">
            <b>Job :</b> {interview.jobID} <br />
            <b>Candidat :</b> {interview.candidateID} <br />
            <b>Date :</b> {new Date(interview.interviewDate).toLocaleString()} <br />
            <button
              className="text-blue-600 hover:underline"
              onClick={() => navigate(`/interview/${interview._id}/evaluate`)}
            >
              Évaluer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};