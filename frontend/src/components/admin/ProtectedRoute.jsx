import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute=({children})=>{
    const {user}=useSelector(store=>store.auth);
    const navigate=useNavigate();
    const [checking, setChecking] = useState(true);
    useEffect(()=>{
        if(user===null||user.role !='recruiter'){
            navigate("/");
            return;
        }
        setChecking(false);

    },[navigate, user]);
    if (checking) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-teal-700" /></div>;
    return (
        <>
        {children}
        </>
    )

};
export default ProtectedRoute