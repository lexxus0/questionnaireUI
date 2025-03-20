import { useFormik } from "formik";
import { useAppDispatch } from "../store/hooks";
import {
  createQuestionnaire,
  updateQuestionnaire,
} from "../store/questionnaires/operations";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { IModalProps, IQuestionnaire } from "../interfaces/interfaces";

interface CreateEditQuestionnaireProps extends IModalProps {
  questionnaire?: IQuestionnaire;
}

export default function QuestionnaireForm({
  isOpen,
  onClose,
  questionnaire,
}: CreateEditQuestionnaireProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isEditing = !!questionnaire;

  const formik = useFormik({
    initialValues: {
      name: questionnaire?.name || "",
      description: questionnaire?.description || "",
      questions: questionnaire?.questions || [],
    },
    onSubmit: async (values) => {
      try {
        const id = questionnaire?._id;

        if (isEditing) {
          await dispatch(
            updateQuestionnaire({ id: questionnaire._id, ...values })
          ).unwrap();
          navigate(`/questionnaire/${id}/update`);
        } else {
          const response = await dispatch(createQuestionnaire(values)).unwrap();
          if (response?._id) {
            navigate(`/questionnaire/${response._id}/build`);
          }
        }
      } catch (error) {
        console.error("Failed to save questionnaire:", error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-5 rounded-3xl w-[400px] h-auto">
        <h2 className="mb-7 font-medium">
          {isEditing ? "Edit Questionnaire" : "Create Questionnaire"}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="border border-[#526e96] py-2 rounded-[8px] mb-2 pl-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="resize-none border border-[#526e96] h-14 rounded-[8px] mb-4 pl-3"
            />
          </div>

          <button
            type="submit"
            className="mx-auto block bg-blue-300 text-white px-3 py-2 rounded-4xl my-1 cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>
    </Modal>
  );
}
