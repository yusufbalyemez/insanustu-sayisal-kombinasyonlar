import { FaCopy } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { TbSquaresSelected } from "react-icons/tb";

const CopyAndSelectButtons = ({copyState,goster,handleCopy,setSelectedSurahs}) => {
  return (
    <>
    {goster && (
        <div>
          <div className="flex justify-end items-center gap-2">
            <button
              className="bg-gray-700 p-2 text-white rounded flex items-center justify-center gap-1 hover:bg-yellow-400 hover:text-blue-900 duration-300"
              onClick={handleCopy}
            >
              {copyState ? (
                <>
                  <FaCircleCheck />
                  Kopyalandı
                </>
              ) : (
                <>
                  <FaCopy />
                  Sayıyı Kopyala
                </>
              )}
            </button>
            <button
              className="bg-gray-700 p-2 text-white rounded flex items-center justify-center gap-1 hover:bg-yellow-400 hover:text-blue-900 duration-300"
              onClick={()=> setSelectedSurahs([])}
            >
              <TbSquaresSelected className="text-xl"/>
              Seçimleri Kaldır
            </button>
          </div>
        </div>
      )}
      </>
  )
}

export default CopyAndSelectButtons