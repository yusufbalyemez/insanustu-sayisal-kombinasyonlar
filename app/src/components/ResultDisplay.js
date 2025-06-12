import { RiNumbersFill } from "react-icons/ri";
import { CgMathDivide } from "react-icons/cg";
import { useLanguage } from "../context/LanguageContext";

const ResultDisplay = ({ stringSayi, calculateMod19 }) => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  return (
    <div
      className="flex flex-col items-center justify-center p-2 md:p-6
   bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-2xl
    ring-2 ring-gray-600 hover:ring-4 hover:ring-yellow-400 transition-all
     duration-300 text-white min-w-72 mt-20"
    >
      <div>
        <p className="flex items-center text-base md:text-lg font-semibold mb-2">
          <RiNumbersFill className="text-lg mr-1" />
          {translations.resultDisplay.text1}{" "}
          <span className="text-yellow-300 ml-1">{stringSayi.length}</span>
        </p>
        <p className="flex items-center text-base md:text-lg font-semibold">
          <CgMathDivide className="text-lg font-bold" />
          {translations.resultDisplay.text2}
          <span className="text-green-300 ml-1">
            {calculateMod19(stringSayi)}
          </span>
        </p>
      </div>
    </div>
  )
}

export default ResultDisplay