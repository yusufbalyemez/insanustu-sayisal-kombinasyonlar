import AllSuras from "../assets/SurahInfo.json";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SurasList = ({ width = 800 }) => {
  return (
    <div className="h-96 overflow-auto md:w-3/4 mt-20">
      <table className="w-full border-collapse">
        <thead className="sticky top-0">
          <tr className="bg-white">
            <th className="px-4 py-2 border-b border-gray-300">Surah Number</th>
            <th className="px-4 py-2 border-b border-gray-300">Surah Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Total Ayahs</th>
            <th className="px-4 py-2 border-b border-gray-300">
              Starts with Huruf Muqattaat
            </th>
            <th className="px-4 py-2 border-b border-gray-300">
              Starts with Basmala
            </th>
          </tr>
        </thead>
        <tbody>
          {AllSuras.map((sura, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-white">
              <td className="px-4 py-2 border-b text-center border-gray-300">
                {sura.surahNumber}
              </td>
              <td className="px-4 py-2 border-b text-center border-gray-300">
                {sura.surahName}
              </td>
              <td className="px-4 py-2 border-b text-center border-gray-300">
                {sura.totalAyahs}
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-xl">
                {sura.startsWithHurufMuqattaat ? (
                  <div className="v-center text-green-400">
                    <AiOutlineCheckCircle />
                  </div>
                ) : (
                  <div className="v-center  text-red-500">
                    <AiOutlineCloseCircle />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 border-b  border-gray-300 text-xl">
                {sura.startsWithBasmala ? (
                  <div className="v-center text-green-400">
                    <AiOutlineCheckCircle />
                  </div>
                ) : (
                  <div className="v-center text-red-500">
                    <AiOutlineCloseCircle />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurasList;
