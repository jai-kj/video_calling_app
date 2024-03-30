import { CallLayout } from "@/config/constants";
import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGridIcon,
} from "lucide-react";

interface IToggleCallLayoutButtonGroupProps {
  layout: CallLayout;
  handleLayoutChange: (layout: CallLayout) => void;
}

const ToggleCallLayoutButtonGroup = ({
  layout,
  handleLayoutChange,
}: IToggleCallLayoutButtonGroupProps) => {
  return (
    <div className="mx-auto w-fit space-x-6">
      <button
        type="button"
        title={CallLayout.VERTICAL}
        onClick={() => handleLayoutChange(CallLayout.VERTICAL)}
      >
        <BetweenVerticalEnd
          className={layout !== CallLayout.VERTICAL ? "text-gray-400" : ""}
        />
      </button>
      <button
        type="button"
        title={CallLayout.HORIZONTAL}
        onClick={() => handleLayoutChange(CallLayout.HORIZONTAL)}
      >
        <BetweenHorizonalEnd
          className={layout !== CallLayout.HORIZONTAL ? "text-gray-400" : ""}
        />
      </button>
      <button
        type="button"
        title={CallLayout.GRID}
        onClick={() => handleLayoutChange(CallLayout.GRID)}
      >
        <LayoutGridIcon
          className={layout !== CallLayout.GRID ? "text-gray-400" : ""}
        />
      </button>
    </div>
  );
};

export default ToggleCallLayoutButtonGroup;
