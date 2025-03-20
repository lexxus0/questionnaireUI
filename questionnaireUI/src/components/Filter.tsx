import { useState, useEffect } from "react";
import Select from "react-select";
import { fetchQuestionnaires } from "../store/questionnaires/operations";
import { useAppDispatch } from "../store/hooks";

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "questions", label: "Number of Questions" },
  { value: "completions", label: "Number of Completions" },
];

export default function Filter() {
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<{ value: string; label: string } | null>(
    null
  );

  const handleSortChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSortBy(selectedOption);
  };

  useEffect(() => {
    dispatch(fetchQuestionnaires({ sortBy: sortBy?.value || undefined }));
  }, [dispatch, sortBy]);

  return (
    <div className="container ml-5 w-50">
      <label className="font-medium text-lg mb-2 block">Sort by:</label>
      <Select
        value={sortBy}
        onChange={handleSortChange}
        options={sortOptions}
        placeholder="Select sorting..."
        isClearable
      />
    </div>
  );
}
