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
    <div className="flex flex-row justify-between gap-2 px-6 max-w-screen-md mx-auto">
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
