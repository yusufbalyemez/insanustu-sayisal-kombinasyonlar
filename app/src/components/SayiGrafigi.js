import React from "react";
import { calculateMod19, isDifferent } from "./Functions";

// Metin kutusunun altında, o sayfanın büyük sayısının nasıl oluştuğunu
// 3 adımda gösteren grafik. Her şey sayfanın KENDİ verisinden üretilir:
// örnek sureler, sıralama ve 19 kontrolleri elle yazılmaz.

const dilEn = () => localStorage.getItem("lang_quran_evidence") === "en";

// Sayı listesindeki renklerle aynı
const RENK = {
  "ayet-sayisi": "text-yellow-400",
  ayetNo: "text-white",
  sureNo: "text-blue-400",
  "ayetNo-toplamlari": "text-yellow-400",
  "sureNo+AyetSayisi": "text-yellow-400",
  besmele: "text-orange-400",
  "toplam-ayet-sayisi": "text-green-300",
  "tum-ayet-no-toplamlari": "text-cyan-400",
  "sure-sayisi": "text-orange-400",
};

const ETIKET = {
  "ayet-sayisi": ["ayet sayısı", "verse count"],
  ayetNo: ["ayet numaraları", "verse numbers"],
  sureNo: ["sure numarası", "surah number"],
  "ayetNo-toplamlari": ["ayet numaralarının toplamı", "sum of verse numbers"],
  "sureNo+AyetSayisi": ["sure no + ayet sayısı", "surah no + verse count"],
  besmele: ["besmele", "basmala"],
  "toplam-ayet-sayisi": ["Kuran'daki toplam ayet sayısı", "total verses in the Quran"],
  "tum-ayet-no-toplamlari": ["tüm ayet numaralarının toplamı", "sum of all verse numbers"],
  "sure-sayisi": ["sure sayısı", "number of surahs"],
};

// Bir sureye ait olmayan, tüm Kuran'ı ilgilendiren sayılar
const GENEL = new Set(["toplam-ayet-sayisi", "tum-ayet-no-toplamlari", "sure-sayisi"]);

const etiket = (durum, en) => (ETIKET[durum] ? ETIKET[durum][en ? 1 : 0] : durum);
const binlik = (n) => n.toLocaleString("tr-TR");

// Diziyi bloklara ayır: ardışık aynı sureye ait elemanlar bir blok,
// genel sayılar (toplam ayet sayısı vb.) ayrı bloklar
const bloklaraAyir = (dizi) => {
  const bloklar = [];
  dizi.forEach((e, i) => {
    const genel = GENEL.has(e.durum);
    const anahtar = genel ? `g-${i}` : `s-${e.sureNo}`;
    const son = bloklar[bloklar.length - 1];
    if (son && son.anahtar === anahtar) son.elemanlar.push(e);
    else bloklar.push({ anahtar, genel, sureNo: genel ? null : e.sureNo, elemanlar: [e] });
  });
  return bloklar;
};

// Uzun "1 2 3 ... 286" dizilerini kısalt
const kisalt = (elemanlar) => {
  const out = [];
  let i = 0;
  while (i < elemanlar.length) {
    let j = i;
    while (j + 1 < elemanlar.length && elemanlar[j + 1].durum === elemanlar[i].durum) j++;
    const grup = elemanlar.slice(i, j + 1);
    if (grup.length > 7) {
      // farklı (kırmızı) olanlar her zaman görünsün
      const goster = new Set([0, 1, 2, grup.length - 2, grup.length - 1]);
      grup.forEach((g, k) => g.__fark && goster.add(k));
      let onceki = -1;
      [...goster].sort((a, b) => a - b).forEach((k) => {
        if (onceki >= 0 && k - onceki > 1) out.push({ ucNokta: true });
        out.push(grup[k]);
        onceki = k;
      });
    } else out.push(...grup);
    i = j + 1;
  }
  return out;
};

const Sayi = ({ e }) =>
  e.ucNokta ? (
    <span className="text-gray-400">…</span>
  ) : (
    <span className={e.__fark ? "text-red-400 font-bold" : RENK[e.durum] || "text-white"}>
      {e.deger}
    </span>
  );

const Adim = ({ no, children }) => (
  <p className="flex items-center gap-2 font-semibold text-yellow-400 text-base md:text-lg mb-2">
    <span className="w-6 h-6 rounded-full bg-yellow-400 text-gray-900 text-sm flex items-center justify-center flex-shrink-0">
      {no}
    </span>
    {children}
  </p>
);

const Ok = () => <div className="text-center text-gray-400 text-2xl my-2">↓</div>;

const SayiGrafigi = ({ dizi, orjinal, stringSayi }) => {
  if (!dizi || !dizi.length || !orjinal || !orjinal.length || !stringSayi) return null;
  const en = dilEn();

  const isaretli = dizi.map((e) => ({ ...e, __fark: isDifferent(e, orjinal) }));
  const farkVar = isaretli.some((e) => e.__fark);
  const bloklar = bloklaraAyir(isaretli);
  const sureBloklari = bloklar.filter((b) => !b.genel);
  const genelBloklar = bloklar.filter((b) => b.genel);

  // 1. adım: ilk iki sure + değiştirilmiş sure(ler) (en fazla 2)
  const ornekler = sureBloklari.slice(0, 2);
  sureBloklari
    .filter((b) => b.elemanlar.some((e) => e.__fark) && !ornekler.includes(b))
    .slice(0, 2)
    .forEach((b) => ornekler.push(b));

  // Bir parçanın tarifi: ilk birkaç sure içinde en çok türü içeren surenin
  // eleman türleri sırasıyla (ör. 1. surede olmayan besmele de görünsün)
  const turleri = (b) => {
    const t = [];
    b.elemanlar.forEach((e) => {
      if (t[t.length - 1] !== e.durum) t.push(e.durum);
    });
    return t;
  };
  const tarif = sureBloklari
    .slice(0, 5)
    .map(turleri)
    .reduce((enUzun, t) => (t.length > enUzun.length ? t : enUzun), []);

  // 2. adım: zincir (ilk 3 sure, değişenler, son sure; genel sayılar yerinde)
  const sonSure = sureBloklari[sureBloklari.length - 1];
  const tut = new Set([...sureBloklari.slice(0, 3), sonSure]);
  sureBloklari.filter((b) => b.elemanlar.some((e) => e.__fark)).forEach((b) => tut.add(b));
  const zincir = [];
  let atlandi = false;
  bloklar.forEach((b) => {
    if (b.genel || tut.has(b)) {
      if (atlandi) zincir.push({ ucNokta: true });
      zincir.push(b);
      atlandi = false;
    } else atlandi = true;
  });
  const tersSira = sureBloklari.length > 1 && sureBloklari[0].sureNo > sonSure.sureNo;

  // 3. adım: kontroller
  const kalan = calculateMod19(stringSayi);
  const basamak = stringSayi.length;
  const orjBasamak = orjinal.reduce((t, e) => t + String(e.deger).length, 0);
  const basamakKontrolu = orjBasamak % 19 === 0; // bu sayfa basamak sayısını da iddia ediyor mu
  const basamakTamam = basamak % 19 === 0;

  const bas = stringSayi.slice(0, 22);
  const son = stringSayi.slice(-10);

  return (
    <div className="w-full md:w-10/12 mb-10 bg-gradient-to-l from-gray-700 to-gray-800 border border-gray-300 rounded-lg p-4 text-white">
      {/* 1. ADIM */}
      <Adim no={1}>{en ? "Each surah forms its own piece" : "Her sure kendi parçasını oluşturur"}</Adim>
      <div className="text-sm text-gray-300 mb-2">
        {en ? "Piece = " : "Parça = "}
        {tarif.map((d, i) => (
          <span key={d}>
            {i > 0 && <span className="text-gray-400"> + </span>}
            <span className={RENK[d]}>{etiket(d, en)}</span>
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {ornekler.map((b) => {
          const degisti = b.elemanlar.some((e) => e.__fark);
          return (
            <div
              key={b.anahtar}
              className={`bg-gray-900/40 rounded-lg px-3 py-2 ${degisti ? "ring-2 ring-red-400" : ""}`}
            >
              <div className={`text-xs ${degisti ? "text-red-300" : "text-gray-400"}`}>
                {en ? `Surah ${b.sureNo}` : `${b.sureNo}. sure`}
                {degisti && (en ? " — changed" : " — değiştirilmiş")}
              </div>
              <div className="text-lg flex flex-wrap gap-x-2 break-all">
                {kisalt(b.elemanlar).map((e, i) => (
                  <Sayi key={i} e={e} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Ok />

      {/* 2. ADIM */}
      <Adim no={2}>
        {en ? "The pieces are joined end to end" : "Parçalar sırayla uç uca eklenir"}
      </Adim>
      {tersSira && (
        <div className="text-sm text-gray-300 mb-2">
          {en ? "Order: from the last surah to the first" : "Sıra: son sureden ilk sureye doğru"}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-1.5">
        {zincir.map((b, i) => {
          if (b.ucNokta) return <span key={i} className="text-gray-400">+ … +</span>;
          const degisti = b.elemanlar.some((e) => e.__fark);
          const ilk = i === 0 || zincir[i - 1].ucNokta;
          return (
            <React.Fragment key={b.anahtar}>
              {!ilk && <span className="text-gray-400">+</span>}
              {b.genel ? (
                <span
                  className={`rounded-md px-2 py-1 text-sm border ${
                    degisti ? "bg-red-900 border-red-400" : "bg-gray-700 border-gray-500"
                  }`}
                >
                  <span className={degisti ? "text-red-300" : RENK[b.elemanlar[0].durum]}>
                    {b.elemanlar[0].deger}
                  </span>{" "}
                  <span className="text-gray-300 text-xs">{etiket(b.elemanlar[0].durum, en)}</span>
                </span>
              ) : (
                <span
                  className={`rounded-md px-2 py-1 text-sm border ${
                    degisti ? "bg-red-900 border-red-400" : "bg-gray-700 border-gray-500"
                  }`}
                >
                  {en ? `Surah ${b.sureNo}` : `${b.sureNo}. sure`}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="bg-gray-900 rounded-lg px-3 py-2 mt-2 font-mono text-sm break-all">
        {bas}
        <span className="text-gray-400"> … </span>
        {son}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {en
          ? `One giant number of ${binlik(basamak)} digits`
          : `${binlik(basamak)} basamaklı tek bir dev sayı`}
      </div>

      <Ok />

      {/* 3. ADIM */}
      <Adim no={3}>{en ? "Result: the 19 check" : "Sonuç: 19 kontrolü"}</Adim>
      <div className="flex flex-col gap-2">
        <div
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            kalan === 0 ? "bg-green-900" : "bg-red-900"
          }`}
        >
          <span className="text-xl">{kalan === 0 ? "✓" : "✗"}</span>
          <span>
            {en ? "Giant number ÷ 19 → remainder " : "Dev sayı ÷ 19 → kalan "}
            <b>{kalan}</b>
          </span>
        </div>
        {basamakKontrolu && (
          <div
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
              basamakTamam ? "bg-green-900" : "bg-red-900"
            }`}
          >
            <span className="text-xl">{basamakTamam ? "✓" : "✗"}</span>
            <span>
              {en ? "Number of digits " : "Basamak sayısı "}
              <b>
                {basamakTamam
                  ? `${binlik(basamak)} = 19 × ${binlik(basamak / 19)}`
                  : `${binlik(basamak)} → ${en ? "not a multiple of 19" : "19'a tam bölünmüyor"}`}
              </b>
            </span>
          </div>
        )}
      </div>
      <p className={`text-sm mt-3 ${farkVar ? "text-red-300" : "text-green-300"}`}>
        {farkVar
          ? en
            ? "Your list has been changed: the red numbers above are the changed places, and the 19 check is broken."
            : "Listede değişiklik var: yukarıdaki kırmızı sayılar değiştirilen yerler ve 19 kontrolü bozuldu."
          : en
          ? "Add or remove even a single verse and these checks break. Try it: change a verse count from the Surahs menu."
          : "Tek bir ayet eklense ya da çıkarılsa bu kontroller bozulur. Denemek için Sureler menüsünden bir ayet sayısını değiştirin."}
      </p>
    </div>
  );
};

export default SayiGrafigi;
