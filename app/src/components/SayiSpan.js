import { memo } from "react";

// Tek bir sayıyı gösteren span.
// memo sayesinde bir sayıya dokunulduğunda 6000+ sayının hepsi değil,
// sadece görünümü (className) değişen sayılar yeniden çizilir.
// Bu, özellikle iPhone'larda (Safari/WebKit) dokunma gecikmesini ortadan kaldırır.
const SayiSpan = memo(function SayiSpan({
  index,
  eleman,
  isDiff,
  className,
  onTap,
  differentRefs,
}) {
  // Sondaki "\u200B" (görünmez boşluk) tarayıcıya "satır buradan kırılabilir"
  // der. Bu olmadan 6000+ sayı boşluksuz TEK bir dev kelime gibi davranıyordu:
  // sayılar satır sonunda ortadan bölünüyor, Safari (iPhone) her değişiklikte
  // bu dev kelimeyi satırlara bölmek için çok ağır hesap yapıp donuyordu.
  return (
    <>
    <span
      ref={(el) => {
        if (el && isDiff) {
          differentRefs.current[index] = el;
        } else {
          delete differentRefs.current[index];
        }
      }}
      onClick={() => onTap(eleman)}
      className={className}
    >
      {eleman.deger}
    </span>
    {"\u200B"}
    </>
  );
});

export default SayiSpan;
