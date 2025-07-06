import { createContext,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider  = (props)=>{

    const [credit, setCredit] = useState(false);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const {getToken} = useAuth();

   
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

    const value = {  
        credit,
        setCredit,
        loadCreditsData,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;