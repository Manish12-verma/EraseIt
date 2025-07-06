import { createContext,useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider  = (props)=>{

    const [credit, setCredit] = useState(false);
    const [image ,setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const navigate = useNavigate();

    const {getToken} = useAuth();
    const {isSignedIn} = useUser();
    const {openSignIn} = useClerk();

   
    const loadCreditsData = async()=>{
        try {
            const token  = await getToken();
            const {data} = await axios.get(`${backendUrl}/api/user/credits`,{
                headers:{
                    token
                } 
            })
            console.log("Credits data received:", data);
            if(data.success){
                setCredit(data.credits);
                console.log("Credits loaded successfully:", data.credits);
            }

        } catch (error) {
             console.error("Error loading credits data:", error.message);
            toast.error("Failed to load credits data. Please try again later."); 
        }
    }

    //Remove bg
    const removeBg = async(image)=>{
            try {
                  
                if(!isSignedIn){
                      return openSignIn();
                }
                 setImage(image);
                  
                 setResultImage(false);

                navigate('/result');

                const token = await getToken();
                const formData = new FormData();

                image && formData.append('image', image);

                const {data} = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, {
                    headers:{
                        token
                    }
                })
                
        

                if(data.success){
                    setResultImage(data.resultImage);
                    data.creditBalance && setCredit(data.creditBalance); 
                    
                }else{
                    
                    data.creditBalance && setCredit(data.creditBalance); 
                    if(data.creditBalance === 0){
                       toast.error( "Insufficient credits. Please buy more credits.");
                     navigate('/buy');
                    }
                }
            } catch (error) {
                
                toast.error(error.message || "Failed to remove background. Please try again later.");
            }
    }

    const value = {  
        credit,
        setCredit,
        loadCreditsData,
        backendUrl,
        image,
        setImage,
        removeBg,
        resultImage,setResultImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;