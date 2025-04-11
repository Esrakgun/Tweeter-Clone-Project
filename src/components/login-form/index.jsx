import ForgotPassword from './forgot-password';
import PasswordInput from './password-ınput';
import EmailInput from './email-input';
import AuthToogle from './auth-toogle';
import Button from './button';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const navigate =useNavigate();
    // Kayıt Olma Moodunda mıyız state 'i tututuk:
    const [isSign, setIsSign] = useState(false);
    // Form Gönderilince Çalışacak Fonksiyonumuzun Olduğu Yer:
    const handleSubmit = async (e) => {
        e.preventDefault();

        // İnputtaki Veriyi almak için:
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData.entries());
        console.log(email, password);

        try {

            if (isSign) {

               //Kayıt Olma Modund isek:Yeni Hesap Oluştur:
               const res = await createUserWithEmailAndPassword(auth, email, password);
            //    console.log(res.user); 
                  
                //Doğrulama Kodu / E-posta Linki yollamak içi Fonksiyon:
                await sendEmailVerification(res.user);
                // await sendEmailVerification(email);

                // Giriş Yap Mooduna Geç:
                setIsSign(false);

                // Bildirim Gönder:
                toast.info("Mailinize Doğrulama e-maili Gönderildi..");

            } else {

                //Giriş Moodunda ise Oturum Aç:
                const res = await signInWithEmailAndPassword(auth, email, password);
                console.log(res.user);

                // Mailinizi Doğrulmamış isebildirim gönder:
                if(!res.user.emailVerified){
                    return toast.info("Lütfen Mailinizi Doğrulayın");
                }
                // AnaSayfaya yönlendir:
                navigate("/feed");
                // Bildirim Gönder:
                toast.info("Hesaba Giriş Yapıldı");
             }

            // Formu Temizle İnputların içini temizle:
            e.target.reset();

        // } catch (error) {
        //     console.log(error);
        //     if (error.code === "auth/email-already-in-use") {
        //         toast.error("Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.");
        //     } else {
        //         // Bildirim Gönder:
        //         toast.error("Hata" + error.code);
        //     }
        // }
           }  catch (error) {
            // hatayı bildirim olarak gönder
            toast.error("Hata: " + error.code);
          }

        //_______________--------------------------------------________________________   
        // ******  örnek catch kısmı :test1@example.com deneye bılırsin:)******
        // } catch (error) {
        //     console.log(error);

        //     switch (error.code) {
        //       case "auth/email-already-in-use":
        //         toast.error("Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.");
        //         break;
        //       case "auth/invalid-email":
        //         toast.error("Geçersiz e-posta adresi. Lütfen kontrol edin.");
        //         break;
        //       case "auth/weak-password":
        //         toast.error("Şifre çok zayıf. En az 6 karakter olmalı.");
        //         break;
        //       case "auth/wrong-password":
        //         toast.error("Şifre yanlış. Lütfen tekrar deneyin.");
        //         break;
        //       default:
        //         toast.error("Bir hata oluştu: " + error.message);
        //     }
        //   }
        //------------------___________________________________------------------------------

    };

    return (
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <EmailInput />
            <PasswordInput />
            <ForgotPassword show={!isSign} />
            <Button isSign={isSign} />
            <AuthToogle isSign={isSign} setIsSign={setIsSign} />
        </form>
    )
}

export default LoginForm;
