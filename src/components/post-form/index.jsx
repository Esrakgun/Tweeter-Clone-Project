import { toast } from "react-toastify";
import FormActions from "./form-actions";
import TextArea from "./text-area";
import UserAvatar from "./user-avatar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useRef, useState } from "react";
import Preview from './preview';
import uploadToStorage from './../../firebase/uploadToStorage';


const PostForm = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Resmin Yüklenmeden Önceki Ön-İzlemesi:
  const [preview, setPreview] = useState(null);
  // Referansını tutmak :
  const fileRef = useRef();

  // Resmin Ön-İzleme URL'sini Oluşturan Fonksiyon:
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Ön-İzlenen Resmi İptal Eden Fonksiyon:
  const clearImage = () => {
    // Ön-İzleme Satet'ini sıfırla:
    setPreview(null);

    // File İnputunun value sunu Temizle:
    if (fileRef.current) {
      fileRef.current.value = " ";
    }
  };

  // Form Gönderilince:
  const handleSubmit = async (e) => {
    e.preventDefault();

    // İnputlardaki Verileri Al:
    const text = e.target.text.value;
    const file = e.target.image.files[0];
    console.log(file);


    // Veri yoksa Bildirim Göster:
    if (!text.trim() && !file) return toast.warning("Lütfen İçeriği belirleyiniz..");
    // console.log(text);


    //Tweet'a koleksiyona ekle:
    try {

      setIsLoading(true);


      // Resim Varsa Resmi Storeage'a Yükleyelim:
    const url = await uploadToStorage(file);

    // console.log(url);
    // return;
    
        
    // Tweets kolleksiyonunun referansını al:
      const collectionRef = collection(db, "tweets");
      console.log(text);

      // Tweets kolleksiyonuna Ekle:
      await addDoc(collectionRef, {
        content: { text, image: url},
        isEdited: false,
        likes: [],
        createdAt: serverTimestamp(),
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });

      // Formu sıfırla:
      e.target.reset();
      setPreview(null);

    } catch (error) {
      console.log(error);
      toast.error("Bir Sorun Oluştur..");
    }finally {
      setIsLoading(false);
    }
  };

  console.log(preview);

  return (
    <div className="border-b border-tw-gray p-4 gap-3">
      <UserAvatar photo={user.photoURL} name={user.displayName} />
      <form onSubmit={handleSubmit}
        className="w-full pt-1">
        <TextArea />
        <Preview  isLoading={isLoading} src={preview} clearImage={clearImage} />
        <FormActions  isLoading={isLoading} fileRef={fileRef} onImageChange={onImageChange} />
      </form>
    </div>
  )

}

export default PostForm;
