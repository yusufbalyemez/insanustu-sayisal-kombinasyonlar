import React from 'react'
import BilgiMetniniGosterenComponent from '../components/BilgiMetniniGosterenComponent'
import { SiMiraheze } from "react-icons/si";

const Number3Info = () => {
  return (
    <BilgiMetniniGosterenComponent>
        <p className="text-yellow-400 flex items-center gap-2">
            <SiMiraheze/>
            İkinci Sayı
          </p>
          <p>
            Her bir suredeki toplam ayet sayısını surenin başına koymak yerine,
            onu her surenin sonuna koyalım. Böylelikle, Sure 1’i temsil eden
            sayı 7 1234567 yerine şu şekilde gözükür: 1234567 7. Sure 2’yi
            temsil eden sayı 286 12345......284285286 yerine şu şekilde gözükür:
            12345.....284 285 286 286. İlk iki sureyi temsil eden sayılar şu
            şekilde gözükür:
          </p>
          <p className="text-green-300">
            1 2 3 4 5 6 7 7 & 1 2 3 4 5.....284 285 286 286.
          </p>
          <p>
            İlk iki sureyi temsil eden bir sayı oluşturmak için bu iki sayıyı
            bir araya getirirsek, şu şekilde gözüken bir sayı elde ederiz:
          </p>
          <p className="text-green-300">
            1 2 3 4 5 6 7 7 1 2 3 4 5.....284 285 286 286.
          </p>
          <p>
            Her bir suredeki her bir ayetin numarasını, sure başına düşen ayet
            sayısı takip eder. Burada gösterilen en son 11 basamak son surenin 6
            ayetidir, ardından onun ayet sayısı (6) gelir, ardından Kuran’daki
            numaralı ayetlerin toplam sayısı (6234) gelir. Bütün, çok uzun sayı,
            19’un bir katıdır.
          </p>
          <p>
            Sure başına düşen ayetlerin toplam sayısını her bir surenin sonuna
            koyduğumuzdan, numaralı ayetlerin toplam sayısını (6324) da Kuran’ın
            sonuna koymak zorundayız. Bu nedenle, son sureyi temsil eden son
            sayıları (123456 6) Kuran’daki numaralı ayetlerin toplam sayısı
            takip eder.
          </p>
          <p className="text-green-300">
            1 2 3 4 5 6 7 & 6234 {`> > >`} 1 2 3 4 5 6 7 6234.
          </p>
          <p>
            Tüm surelerin tüm ayetlerini bir araya getirdiğimiz zaman, 12696
            basamaktan oluşan ve 19’un bir katı olan uzun bir sayı meydana
            gelir.
          </p>
          <p className="text-green-300">
            1234567 7 12345…286 286 12345 5…123456 6 6234
          </p>
    </BilgiMetniniGosterenComponent>
  )
}

export default Number3Info