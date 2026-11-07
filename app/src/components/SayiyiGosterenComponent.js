import { Children } from "react";

// Kaç sayının bir parça (blok) olacağı
const PARCA_BOYUTU = 250;

// 6000+ sayı tek bir dev paragraf olarak durunca iPhone'daki Safari (WebKit)
// her değişiklikte / her animasyon karesinde bütün paragrafı yeniden çiziyor ve
// sayfa donuyordu. Sayılar artık küçük parçalara bölünüyor:
//  - her parça kendi içinde hesaplanıyor (contain)
//  - ekranda görünmeyen parçalar hiç çizilmiyor (content-visibility: auto)
// Varsayılan: parçalama KAPALI (satır aralarında boşluk olmasın).
// Test için adresin sonuna ?parca=1 eklenirse parçalı hali açılır.
const PARCALA =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("parca") === "1";

const SayiyiGosterenComponent = ({ children }) => {
  const elemanlar = PARCALA ? Children.toArray(children) : [];
  const parcalar = [];
  for (let i = 0; i < elemanlar.length; i += PARCA_BOYUTU) {
    parcalar.push(elemanlar.slice(i, i + PARCA_BOYUTU));
  }

  return (
    <div
      className="break-words border border-gray-300 p-4 mb-10 mx-5
       w-full md:w-10/12 bg-gradient-to-l from-gray-700 to-gray-800
        rounded-lg text-xl overflow-y-auto overscroll-contain hover:ring-4
         hover:ring-yellow-400 transition-shadow max-h-[60vh]"
      style={{
        // iOS'ta hızlı art arda dokunuşlarda çift-dokunma yakınlaştırması
        // ve tıklama gecikmesi olmasın
        touchAction: "manipulation",
        // Değişiklikler sadece bu kutunun içinde hesaplansın
        contain: "content",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {PARCALA
        ? parcalar.map((parca, i) => (
            <div key={i} className="sayi-parcasi">
              {parca}
            </div>
          ))
        : children}
    </div>
  );
};

export default SayiyiGosterenComponent;
