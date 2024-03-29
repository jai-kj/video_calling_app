import { useState } from "react";

interface IDescriptionInputProps {
  value: string;
  handleUpdate: (value: string) => void;
}

const DescriptionInput = ({ value, handleUpdate }: IDescriptionInputProps) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting info</div>
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            handleUpdate("");
          }}
        />
        Add description
      </label>
      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Description</span>
          <textarea
            value={value}
            maxLength={500}
            onChange={(e) => handleUpdate(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )}
    </div>
  );
};

export default DescriptionInput;
