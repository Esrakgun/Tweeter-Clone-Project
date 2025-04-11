


const AuthToogle = ({isSign ,setIsSign}) => {
  return (
    <p className="mt-5 select-none flex justify-center gap-2 text-center">
       <span className="text-gray-500">
       {isSign ? " Hesabınız Varsa" : " Hesabınız Yoksa"}
        </span> 
      <span className="cursor-pointer ms-2 text-blue-500 hover:underline" onClick={()=> setIsSign(!isSign)}>
       {isSign ? "Giriş Yapınız" : "Kayıt Ol"}
      </span>
    </p>
      
    
  )
}

export default AuthToogle;
