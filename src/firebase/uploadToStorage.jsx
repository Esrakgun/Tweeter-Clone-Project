import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from ".";
import { v4 } from "uuid";

const uploadToStorage = async (file) => {
    // console.log(file);

    //1) dosya yoksa veya dosya resim değilse fonksiyonu durdur
    //   if (!file || !file.type.startsWith("image")
    //             || !file.type.startsWith("audio")
    //             || !file.type.startsWith("video") )
    //      return null;


    //1) dosya yoksa veya dosya resim değilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) return null;

    //2) dosya boyutu 2mb'ı aşarsa hata fırlat
    if (file.size > 5000000) {
        // console.log("Sınır Aşıldı." + file.size);
        toast.error("Lütfen 2Mb'ın Altın Bir Medya Yükleyin");
        throw new Error("Medya İçeriği Sınırı Aşıyor");
    }

    //3) dosyanın yükleniceği konumun referansını al
    const imageRef = ref(storage, v4() + file.name);

    //4) renferanısnı oluşturduğumu konuma dosyayı yükle
    await uploadBytes(imageRef, file);

    //5) storage'a yüklenen dosyanın url'ini al ve döndür
    const url = await getDownloadURL(imageRef);

    return url;
};

export default uploadToStorage;