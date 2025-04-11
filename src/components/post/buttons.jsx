// İmport Alanı:
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { auth, db } from './../../firebase/index';

const Buttons = ({ tweet }) => {
  // aktif kullanıcının id'si tweet'i likleyanların arasında varmı
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // Like Butttonuna tıklanıldığında ÇalıŞacak Fonksiyon:
  const toggleLike =async () => { 

  // Güncellenicek Dökümanın Referansını al:
  const docRef = doc(db, "tweets", tweet.id);

  // Like basılı ise kullanıcı id'sini Like dizisine ekle,Like butonuna basılı değilse Kullanııc id'sini Likes dizisinden Kaldır:
  await updateDoc(docRef,{
  // "content.text" :"Selam",
      likes:isLiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(auth.currentUser.uid),
  });
}


 return (
    <div className="flex justify-between items-center text-zinc-500">
      <button className="post-icon hover:text-blue-400 hover:bg-blue-400/20">
        <FaRegComment />
      </button>

      <button className="post-icon hover:text-green-400 hover:bg-green-300/20">
        <FaRetweet />
      </button>

      <button onClick={toggleLike} className="flex items-center hover:text-pink-500 relative">
        <span className="post-icon hover:bg-pink-400/20">{isLiked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}</span>
        <span className={`absolute -end-1 ${isLiked && "text-pink-500"}`}>{tweet.likes.length}</span>
      </button>

      <button className="post-icon hover:text-blue-400 hover:bg-blue-400/20">
        <FaShareNodes />
      </button>
    </div>
  );
}

export default Buttons;
