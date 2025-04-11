import { useRef, useState } from "react";
import Modal from "../modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";


const ForgotPassword = ({ show }) => {

  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef();

  const handleClick = () => {
    // console.log(inputRef.current.value);
    const email = inputRef.current.value;
    // console.log(email);

    sendPasswordResetEmail(auth , email)
      .then(()=>{
      toast.info("Mailinizw Şifre Sıfırlama Bağlantısı Gönderildi.");
      setIsOpen(false);
    }).catch(()=>{
      toast.error("Mail Gönderilemedi");
    })

  };

  return (

    show ? (

      <>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-end text-sm text-gray-500 hover:text-gray-400 mt-2 cursor-pointer">
          Şifreni mi Unuttun?
        </button>

        <Modal isOpen={isOpen} close={() => setIsOpen(false)}>

          <div className="flex flex-col gap-3">

            <h1 className="text-3xl">Şifreni mi Unuttun ?</h1>

            <p className="text-zinc-400">Email Adresine Bir Şifre Sıfırlama Bağlantısı Gönder</p>

            <input ref={inputRef} type="email" className="input mt-10" />

            <button
              onClick={handleClick}
              type="button"
              className="bg-white hover:bg-gray-300 transition text-black rounded-full mt-8 py-1 cursor-pointer">Şifre Sıfırlama Maili Gönder</button>

            <button
              onClick={close}
              type="button"
              className="bg-zinc-400 hover:bg-zinc-500 transition text-black rounded-full mt-3 py-1 cursor-pointer">
              İptal
            </button>

          </div>

        </Modal>

      </>

    ) : <div className="h-[28px] w-1" />

  );

};

export default ForgotPassword;
