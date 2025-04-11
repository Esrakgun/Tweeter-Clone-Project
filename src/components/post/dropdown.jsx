
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import EditModal from "../modal/edit-modal";


const Dropdown = ({ tweet }) => {

 const [isOpen,setIsOpen]=useState(false);
 const checkboxRef =useRef();


  // Tweet'i Gönderen Kişi ile Şuan Oturumu Açık Olan Kişinin id'si aynı mı? Bakalım:
  const isOwn = tweet.user.id === auth.currentUser.uid;

  // Dükümanı Sil:
  const handleDelete = () => {
    // Kullanııc Onayına sunduk:
    if (!confirm("Kaldırmak İstediğinizden emin misiniz?")) return;

    // Silinecek Dökümanın Referansını Al:
    const docRef = doc(db, "tweets", tweet.id);

    // Dökümanı Silmek için :
    deleteDoc(docRef).then(() => toast.warning("Bu tweet, Akıştan Kaldırıldı."));

  };

  return (
    isOwn && (
     <>
      <label className="popup">
        <input ref={ checkboxRef} type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Actions</legend>
          <ul>
            <li>
              {/* checkbocref'ı modal kendılıgınden kapansın dıye yaptık duzleneme ve sılme ıslemı sonrası acık kalmasın dıye */}
              <button 
              onClick={()=>{setIsOpen(true);
                checkboxRef.current.checked = false;
              }}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="#ffffff" // ikon rengi beyaz
                  fill="none"
                  viewBox="0 0 24 24"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                </svg>
                <span>Edit</span>
              </button>
            </li>


          <hr />

            <li>
              <button onClick={handleDelete}>
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line y2="18" x2="6" y1="6" x1="18"></line>
                  <line y2="18" x2="18" y1="6" x1="6"></line>
                </svg>
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>

  <EditModal isOpen={isOpen} tweet={tweet} close={()=>setIsOpen(false)} />

     </>
    )
  );
};

export default Dropdown;
