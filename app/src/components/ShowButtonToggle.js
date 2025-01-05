import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useLanguage } from "../context/LanguageContext";

const ShowButtonToggle = ({ toggleGoster, goster }) => {
  const { translations } = useLanguage(); // Çeviri verilerini al
  return (
    <button
      onClick={toggleGoster}
      className={`px-4 py-2 font-bold rounded flex items-center justify-center gap-2 ${goster ? "bg-green-900 text-white" : "bg-yellow-400 text-blue-900"
        }`}
    >
      {goster ? (
        <>
          <BiSolidHide className="text-lg" />
          {translations.buttons.text2}
        </>
      ) : (
        <>
          <BiShow className="text-lg" />
          {translations.buttons.text1}
        </>
      )}
    </button>
  )
}

export default ShowButtonToggle