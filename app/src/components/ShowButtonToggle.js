import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const ShowButtonToggle = ({toggleGoster,goster}) => {
  return (
    <button
        onClick={toggleGoster}
        className={`mb-4 px-4 py-2 font-bold rounded flex items-center justify-center gap-2 ${
          goster ? "bg-green-900 text-white" : "bg-yellow-400 text-blue-900"
        }`}
      >
        {goster ? (
          <>
            <BiSolidHide className="text-lg" />
            Metni Göster
          </>
        ) : (
          <>
            <BiShow className="text-lg" />
            Sayıyı Göster
          </>
        )}
      </button>
  )
}

export default ShowButtonToggle