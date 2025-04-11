import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import PageLoader from "../loader/page-loader";

const Protected = () => {

    const [user,setUser]=useState();
    // console.log(user);
//Kullanıcının Oturum Verisini Al:
    useEffect(()=>{
// Kullanıcı Oturum Verisine abone ol:
 const unsub = onAuthStateChanged(auth ,(active_user) => setUser(active_user));

//  Kullanıcı Sayfası Ayrılınca Aboneliği Durdur:
return () => unsub();
},[]);


 //Kullanıcı Route'un element'ini ekrana bas:Oturum Verileri Gelene Kadar Yüklenıyor basıcam!
    if (user===undefined) return <PageLoader/>;
    
// Kullanıcının Oturumu Kapalıysa Login'e Yönlerdir:Oturum Verileri Gelmediyse Logine Yönlendir!
   if (user===null || user?.emailVerified === false) {
    if( user?.emailVerified === false) toast.info("Mailiizi Doğrulayın");

    return <Navigate to="/" replace />; 
}
//Alt Route'in elementini ekrana basmak için Outlet Componentini kullandık: Oturum Verileri Geldiyse Alt Route'un Elementlerini Ekrana  basıcam!
  return <Outlet context={user} />;
};

export default Protected;


 



    

