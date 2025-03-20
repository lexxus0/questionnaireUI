import { useState } from "react";
import QuestionnaireForm from "./QuestionnaireForm";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <div className="flex justify-between p-5">
      <h2 className="font-semibold text-2xl ">ET-school test task</h2>
      <button
        onClick={toggleModal}
        type="button"
        className="bg-blue-600 text-white px-3 py-2 rounded-2xl cursor-pointer"
      >
        Create quiz
      </button>
      <QuestionnaireForm isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
}
