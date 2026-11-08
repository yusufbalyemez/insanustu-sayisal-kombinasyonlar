import { Children, useEffect, useRef, useState } from "react";
import { IoChevronUp, IoChevronDown, IoWarningOutline } from "react-icons/io5";

// Kaç sayının bir parça (blok) olacağı (sadece ?parca=1 ile kullanılır)
const PARCA_BOYUTU = 250;

// Varsayılan: parçalama KAPALI (satır aralarında boşluk olmasın).
// Test için adresin sonuna ?parca=1 eklenirse parçalı hali açılır.
const PARCALA =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("parca") === "1";

const dilEn = () => localStorage.getItem("lang_quran_evidence") === "en";

// Kırmızı sayının ne olduğunu anlatan kısa yazı
const farkAciklamasi = (e) => {
  const en = dilEn();
  const s = e.sureNo;
  switch (e.durum) {
    case "ayetNo":
      return en ? `Surah ${s}, verse no ${e.deger}` : `${s}. sure, ayet no ${e.deger}`;
    case "ayet-sayisi":
      return en ? `Surah ${s}, verse count ${e.deger}` : `${s}. surenin ayet sayısı: ${e.deger}`;
    case "ayetNo-toplamlari":
      return en ? `Surah ${s}, sum of verse no's ${e.deger}` : `${s}. surenin ayet no toplamı: ${e.deger}`;
    case "sureNo+AyetSayisi":
      return en ? `Surah ${s}, surah no + verse count ${e.deger}` : `${s}. sure, sure no + ayet sayısı: ${e.deger}`;
    case "besmele":
      return en ? `Surah ${s}, basmala ${e.deger}` : `${s}. sure, besmele: ${e.deger}`;
    case "sureNo":
      return en ? `Surah no ${e.deger}` : `Sure no: ${e.deger}`;
    case "toplam-ayet-sayisi":
      return en ? `Total verse count ${e.deger}` : `Toplam ayet sayısı: ${e.deger}`;
    case "tum-ayet-no-toplamlari":
      return en ? `Sum of all verse no's ${e.deger}` : `Tüm ayet no toplamı: ${e.deger}`;
    case "sure-sayisi":
      return en ? `Number of surahs ${e.deger}` : `Sure sayısı: ${e.deger}`;
    default:
      return String(e.deger);
  }
};

const SayiyiGosterenComponent = ({ children }) => {
  const elemanlar = Children.toArray(children);
  const kutuRef = useRef(null);
  const aktifElRef = useRef(null);
  const barRef = useRef(null);
  const [aktif, setAktif] = useState(-1);

  // Farklı (kırmızı) sayılar, sayfadaki sırasıyla
  const farklar = elemanlar
    .filter((c) => c && c.props && c.props.isDiff)
    .map((c) => c.props.eleman);
  // Liste ilk oluşurken orijinal liste boşsa her şey "farklı" görünebilir: yok say
  const gecerliFarklar =
    farklar.length > 0 && farklar.length < elemanlar.length ? farklar : [];
  const farkImzasi = gecerliFarklar
    .map((e) => `${e.durum}|${e.sureNo}|${e.deger}`)
    .join(",");

  const farkaGit = (i) => {
    const kutu = kutuRef.current;
    if (!kutu) return;
    const kirmizilar = kutu.querySelectorAll(".blink");
    if (!kirmizilar.length) return;
    const n = kirmizilar.length;
    const hedefIndex = ((i % n) + n) % n; // sondan başa / baştan sona döner
    const el = kirmizilar[hedefIndex];
    if (aktifElRef.current) aktifElRef.current.classList.remove("aktif-fark");
    el.classList.add("aktif-fark");
    aktifElRef.current = el;
    // 1) Sayı kutusunun içinde, kırmızı sayıyı kutunun ortasına getir.
    //    Uzaksa anında atla (yumuşak kaydırma binlerce sayıda yarıda kalıyordu).
    const kutuRect = kutu.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const hedef =
      kutu.scrollTop + (elRect.top - kutuRect.top) - kutu.clientHeight / 2 + elRect.height / 2;
    const uzak = Math.abs(hedef - kutu.scrollTop) > kutu.clientHeight * 2;
    kutu.scrollTo({ top: Math.max(0, hedef), behavior: uzak ? "auto" : "smooth" });

    // 2) Sayfayı, sayı kutusu sabit çubuğun hemen altında tam görünecek şekilde ayarla
    const bar = barRef.current;
    if (bar) {
      const ust = (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight + 8;
      const kr = kutu.getBoundingClientRect();
      if (kr.top < ust - 1 || kr.bottom > window.innerHeight) {
        window.scrollBy({ top: kr.top - ust, behavior: "smooth" });
      }
    }
    setAktif(hedefIndex);
  };

  // Sayfa açılınca veya farklılıklar değişince (ör. "Ayeti Değiştir") ilk farka git
  useEffect(() => {
    if (!farkImzasi) {
      setAktif(-1);
      return;
    }
    const t = setTimeout(() => farkaGit(0), 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farkImzasi]);

  const parcalar = [];
  if (PARCALA) {
    for (let i = 0; i < elemanlar.length; i += PARCA_BOYUTU) {
      parcalar.push(elemanlar.slice(i, i + PARCA_BOYUTU));
    }
  }

  const en = dilEn();
  const toplam = gecerliFarklar.length;
  const gosterilen = aktif >= 0 && aktif < toplam ? aktif : 0;

  return (
    <div className="w-full md:w-10/12 mb-10 px-5 md:px-0">
      {toplam > 0 && (
        // Ekranın üstünde (menünün hemen altında) sabit kalan farklılık çubuğu
        <div
          ref={barRef}
          className="sticky top-[72px] md:top-[108px] z-40 mb-2 flex items-center gap-2
           bg-red-900 border border-red-400 rounded-lg px-3 py-2 text-white shadow-lg"
        >
          <IoWarningOutline className="text-2xl text-red-300 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm md:text-base">
              {en
                ? `${toplam} difference${toplam > 1 ? "s" : ""} found`
                : `${toplam} farklılık bulundu`}
            </div>
            <div className="text-xs md:text-sm text-red-200 truncate">
              {gosterilen + 1} / {toplam} · {farkAciklamasi(gecerliFarklar[gosterilen])}
            </div>
          </div>
          <button
            type="button"
            aria-label={en ? "Previous difference" : "Önceki farklılık"}
            onClick={() => farkaGit(gosterilen - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-800 border border-red-400 active:bg-red-700 flex-shrink-0"
          >
            <IoChevronUp className="text-xl" />
          </button>
          <button
            type="button"
            aria-label={en ? "Next difference" : "Sonraki farklılık"}
            onClick={() => farkaGit(gosterilen + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-800 border border-red-400 active:bg-red-700 flex-shrink-0"
          >
            <IoChevronDown className="text-xl" />
          </button>
        </div>
      )}
      <div
        ref={kutuRef}
        className="break-words border border-gray-300 p-4 w-full
          bg-gradient-to-l from-gray-700 to-gray-800
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
    </div>
  );
};

export default SayiyiGosterenComponent;
