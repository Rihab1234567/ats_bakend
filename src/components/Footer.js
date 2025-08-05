import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../components/ContextProvider/Context';

export const Footer = () => {
  const { loginData } = useContext(LoginContext);
  const candidateID = loginData?._id || "667336c6ab92f179a717d0ec";

  // Tableau de liens du footer
  const footerNav = [
    { label: "Jobs", path: "/all-jobs" },
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
    { label: "Post Job", path: "/post-job" },
    { label: "Interview", path: "/interview" },
    { label: "InterviewList", path: "/interview/Interviewdetails" },
    { label: "Evaluation-auto", path: "/evaluation-auto" }
  ];

  // Ajoute dynamiquement les liens Messagerie et Email si connecté
  if (candidateID) {
    footerNav.push(
      { label: "Messagerie", path: `/messagerie/${candidateID}` },
      { label: "Notifier par Email", path: `/notifier/${candidateID}` }
    );
  }

  return (
    <footer className="bg-white rounded-lg shadow m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <ul className="flex flex-wrap justify-center items-center gap-6 mb-6 text-base font-semibold">
          {footerNav.map((menu, key) => (
            <li key={key}>
              <Link
                to={menu.path}
                className="px-4 py-2 rounded transition-colors duration-200
                  text-green-800 hover:bg-green-100 hover:text-green-900"
              >
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()} <Link to="/" className="hover:underline">Innovation™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};