import { BsThreeDotsVertical } from "react-icons/bs";
import { IQuestionnaire } from "../interfaces/interfaces";
import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { removeQuestionnaire } from "../store/questionnaires/operations";
import QuestionnaireForm from "./QuestionnaireForm";
import { useNavigate } from "react-router-dom";

interface QuestionnaireItemProps {
  questionnaire: IQuestionnaire;
}

export default function QuestionnaireItem({
  questionnaire,
}: QuestionnaireItemProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const dispatch = useAppDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleRunClick = (id: string) => {
    if (!id) {
      console.error("Missing questionnaire ID");
      return;
    }
    navigate(`/questionnaire/${id}/run`);
  };

  const handleDeleteClick = (id: string) => {
    if (!id) {
      console.error("Missing questionnaire ID");
      return;
    }
    dispatch(removeQuestionnaire(id));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const menu = document.querySelectorAll(".absolute");
    if (
      menu &&
      !Array.from(menu).some((m) => m.contains(event.target as Node))
    ) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <li className="min-w-[350px] h-[250px] border border-[#5c81c2] p-5 relative flex flex-col">
      <p className="font-semibold text-base mb-3">{questionnaire.name}</p>
      <p className="text-gray-600 max-h-[130px] truncate">
        {questionnaire.description}
      </p>
      <BsThreeDotsVertical
        onClick={toggleMenu}
        className="absolute top-2.5 right-1 text-lg cursor-pointer"
      />
      <div
        className={`absolute top-2.5 right-5 w-16 p-2 bg-white border border-gray-300 rounded shadow-lg transition-transform ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ transition: "all 0.3s ease" }}
      >
        <ul className="space-y-2">
          <li
            onClick={() => {
              toggleModal();
              toggleMenu();
            }}
            className="text-gray-700 cursor-pointer hover:text-blue-500"
          >
            Edit
          </li>
          <li
            onClick={() => handleRunClick(questionnaire._id)}
            className="text-gray-700 cursor-pointer hover:text-blue-500"
          >
            Run
          </li>
          <li
            onClick={() => handleDeleteClick(questionnaire._id)}
            className="text-gray-700 cursor-pointer hover:text-blue-500"
          >
            Delete
          </li>
        </ul>
      </div>
      <div className="flex justify-between mt-auto text-xs">
        <p className="text-blue-500">
          Questions: {questionnaire.questions.length}
        </p>
        <p>Completed {questionnaire.completions} times</p>
      </div>
      <QuestionnaireForm
        isOpen={isModalOpen}
        onClose={toggleModal}
        questionnaire={questionnaire}
      />
    </li>
  );
}
