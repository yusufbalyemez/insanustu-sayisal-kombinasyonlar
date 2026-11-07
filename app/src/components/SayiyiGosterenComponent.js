const SayiyiGosterenComponent = ({ children }) => {
  return (
    <div
      className="break-words border border-gray-300 p-4 mb-10 mx-5
       w-full md:w-10/12 bg-gradient-to-l from-gray-700 to-gray-800
        rounded-lg text-xl overflow-y-auto overscroll-contain hover:ring-4
         hover:ring-yellow-400 transition-shadow max-h-[60vh]"
      // touch-action: manipulation -> iOS'ta hızlı art arda dokunuşlarda
      // çift-dokunma yakınlaştırması ve tıklama gecikmesi olmasın
      style={{ touchAction: "manipulation" }}
    >
      {children}
    </div>
  );
};

export default SayiyiGosterenComponent;



