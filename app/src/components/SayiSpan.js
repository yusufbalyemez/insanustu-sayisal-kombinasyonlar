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
  return (
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
  );
});

export default SayiSpan;
