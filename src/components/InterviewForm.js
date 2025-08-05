import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InterviewForm = () => {
  // IDs de test (à remplacer par des valeurs dynamiques si besoin)
  const [jobID, setJobID] = useState('6676cb664e5a14c58a721384');
  const [recruiterID, setRecruiterID] = useState('6676b5f64e5a14c58a720ebb');
  const [candidateID, setCandidateID] = useState('667656750d96db510a5facbf');
  const [interviewDate, setInterviewDate] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [redirectPage, setRedirectPage] = useState('/dashboard'); // Valeur par défaut

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobID || !recruiterID || !candidateID || !interviewDate) {
      alert("Tous les champs sont obligatoires !");
      return;
    }
    fetch('http://localhost:8080/interview/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobID,
        recruiterID,
        candidateID,
        interviewDate,
        location,
        notes
      })
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          alert('Entretien planifié avec succès !');
          navigate(redirectPage); // Redirige vers la page choisie
        } else {
          alert(result.error || 'Erreur lors de la planification');
        }
      })
      .catch(err => {
        alert("Erreur réseau ou serveur");
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Planifier un entretien</h2>
      <input
        type="text"
        placeholder="Job ID"
        value={jobID}
        onChange={e => setJobID(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Recruiter ID"
        value={recruiterID}
        onChange={e => setRecruiterID(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Candidate ID"
        value={candidateID}
        onChange={e => setCandidateID(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="datetime-local"
        value={interviewDate}
        onChange={e => setInterviewDate(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Lieu"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      {/* Choix de la page de redirection */}
      <label className="block mb-2 mt-4 font-semibold">Rediriger vers :</label>
      <select
        value={redirectPage}
        onChange={e => setRedirectPage(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="/dashboard">Dashboard</option>
        <option value="/all-jobs">Tous les jobs</option>
        <option value="/interview/all">Liste des entretiens</option>
        <option value="/interviewdetails/665e1a2b3c4d5e6f7g8h9i0j">Détail d'un entretien</option>
      </select>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Planifier</button>
    </form>
  );
};