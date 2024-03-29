import { useState } from "react";

interface IParticipantsInputProps {
  value: string;
  handleUpdate: (value: string) => void;
}

const ParticipantsInput = ({
  value,
  handleUpdate,
}: IParticipantsInputProps) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className="space-y-2">
      <div className="font-medium">Participants:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            handleUpdate("");
          }}
        />
        Anyone with the link can join
      </label>
      <label className="flex items-center gap-1.5">
        <input type="radio" checked={active} onChange={() => setActive(true)} />
        Private meeting
      </label>
      {active && (
        <label className="block space-y-1">
          <span className="font-medium">Participant emails</span>
          <textarea
            value={value}
            placeholder="Enter participants email addresses separated by commas"
            onChange={(e) => handleUpdate(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )}
    </div>
  );
};

export default ParticipantsInput;
