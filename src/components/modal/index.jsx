import { IoMdClose } from "react-icons/io";

// HOC:Higher Order Component : 
//Farklı Componentler ya da Jsx elemenetlerinin Childen prop'u olarak alır.HOC sayesinde içeriğin prop olarak göndererek kod tekrarını azaltırız.

const Modal = ({children,isOpen,close}) => {
  return (
    isOpen && (
        <div className="fixed bg-zinc-800/50 inset-0 backdrop-blur-md z-[99999] grid place-items-center">
            <div className="bg-black py-10 px-8 w-3/4 max-w-[500px] rounded-md">
                <div className="flex justify-end">
                    <button type="button"
                    onClick={close}><IoMdClose 
                    className="text-3xl transition hover:text-gray-500"/>
                    </button>
                </div>
                    {children}
            </div>
        </div>
    )
  )
}

export default Modal;
