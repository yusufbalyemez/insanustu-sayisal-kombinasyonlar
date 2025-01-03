import resim1 from '../assets/images/resim1.jpg';
import resim2 from '../assets/images/resim2.jpg';
import { useLanguage } from "../context/LanguageContext";

const Intro = () => {
    const { translations } = useLanguage(); // Çeviri verilerini al
    return (
        <div className="p-4 space-y-4 bg-gray-100 lg:w-3/4 lg:mx-auto my-5 mt-20">
            <h2 className="text-center text-lg font-semibold">{translations.homepage.title}</h2>

            <div className="border p-4 bg-gray-50 rounded">
                <p>
                {translations.homepage.text1}
                </p>
            </div>

            <div className="border p-4 bg-gray-50 rounded">
                <p>{translations.homepage.text2}</p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>
                {translations.homepage.text3}
                </p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>
                {translations.homepage.text4}
                </p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>
                {translations.homepage.text5}
                </p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>
                {translations.homepage.text6}
                </p>
            </div>
            <div className="border p-4 bg-gray-50 rounded">
                <p>{translations.homepage.text7}</p>
                <img src={resim1} alt="resim1" className="w-full lg:w-1/2 mx-auto my-4 border" />
                <p>{translations.homepage.text8}</p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>{translations.homepage.text9}</p>
                <p>{translations.homepage.text10}</p>
                <p>{translations.homepage.text11}</p>
                <p>{translations.homepage.text12}</p>
                <p>{translations.homepage.text13}</p>
                <p>{translations.homepage.text14}</p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>{translations.homepage.text15}</p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>
                {translations.homepage.text16}
                </p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>
                {translations.homepage.text17}
                </p>
            </div>

            <div className="border p-4 bg-gray-50 rounded">
                <p>{translations.homepage.text18}</p>
            </div>

            <div className="border p-4 bg-gray-50 rounded">
                <img src={resim2} alt="resim2" className="w-full lg:w-1/2 mx-auto my-4 border" />
                <p>{translations.homepage.text19}</p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>
                {translations.homepage.text20}
                </p>
            </div>

            <div className="border p-4 bg-white rounded shadow">
                <p>{translations.homepage.text21}</p>
                <p>{translations.homepage.text22}</p>
                <p>{translations.homepage.text23}</p>
                <p>{translations.homepage.text24}</p>
            </div>

            <div className="border p-4 bg-gray-50 rounded">
                <p>{translations.homepage.text25}</p>
                <p>{translations.homepage.text26}</p>
            </div>
            <div className="border p-4 bg-gray-50 rounded">
                <p><a href='https://kuransonahit.org/ek/24' className='pointer text-blue-500 hover:opacity-75 underline'>{translations.homepage.text27}</a></p>
            </div>
            <div className="border p-4 bg-gray-50 rounded">
               <p>{translations.homepage.text28}</p>
            </div>

        </div>
    );
};

export default Intro;
