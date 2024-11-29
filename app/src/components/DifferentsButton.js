import React from "react";

const DifferentsButton = ({ scrollToDifferent, goster, differentRefs }) => {
  const hasDifferences =
    goster && Object.keys(differentRefs.current || {}).length > 0; // goster true ve farklılık varsa

  return (
    <>
      {hasDifferences && (
        <button
          onClick={scrollToDifferent}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          İlk Farklılık Konumuna Git
        </button>
      )}
    </>
  );
};

export default DifferentsButton;
