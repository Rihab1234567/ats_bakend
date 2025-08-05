import React, { useEffect, useState } from 'react';
import { EvaluationForm } from './EvaluationForm';

export const EvaluationAuto = () => {
  const [firstId, setFirstId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/interview/all')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setFirstId(data[0]._id); // On récupère l'ID du premier entretien
        }
      });
  }, []);

  if (!firstId) return <div>Chargement ou aucun entretien trouvé...</div>;

  // On passe l'ID du premier entretien à EvaluationForm
  return <EvaluationForm interviewId={firstId} />;
};