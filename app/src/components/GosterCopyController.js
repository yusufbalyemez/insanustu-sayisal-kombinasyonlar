// src/components/GosterCopyController.jsx
import ShowButtonToggle from "./ShowButtonToggle";
import CopyAndSelectButtons from "./CopyAndSelectButtons";

const GosterCopyController = ({
  toggleGoster,
  goster,
  copyState,
  handleCopy,
  setSelectedSurahs,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <ShowButtonToggle toggleGoster={toggleGoster} goster={goster} />
      <CopyAndSelectButtons
        copyState={copyState}
        goster={goster}
        handleCopy={handleCopy}
        setSelectedSurahs={setSelectedSurahs}
      />
    </div>
  );
};

export default GosterCopyController;
