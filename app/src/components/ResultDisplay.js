import { RiNumbersFill } from "react-icons/ri";
import { CgMathDivide } from "react-icons/cg";

const ResultDisplay = ({stringSayi,calculateMod19}) => {
  return (
    <div
    className="flex flex-col items-center justify-center p-6
   bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-2xl
    ring-2 ring-gray-600 hover:ring-4 hover:ring-yellow-400 transition-all
     duration-300 text-white min-w-72 mt-20"
  >
    <div>
      <p className="flex items-center text-lg font-semibold mb-2">
        <RiNumbersFill className="text-lg mr-1" />
        Basamak Sayısı:{" "}
        <span className="text-yellow-300 ml-1">{stringSayi.length}</span>
      </p>
      <p className="flex items-center text-lg font-semibold">
        <CgMathDivide className="text-lg font-bold" />
        19'a bölümünden kalan:
        <span className="text-green-300 ml-1">
          {calculateMod19(stringSayi)}
        </span>
      </p>
    </div>
  </div>
  )
}

export default ResultDisplay