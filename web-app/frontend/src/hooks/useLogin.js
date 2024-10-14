import { useState } from "react";
import { useAuthContext } from "../components/context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }) => {
        console.log("inside login");
        setLoading(true);
        try {
            const success = handleInputErrors({ username, password });
            console.log("inside handleInputErrors");
            if (!success) {
                return;
            }
            console.log("afterhandleInputErrors ");
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            console.log("after fetch");
            const data = await res.json();
            if (data.error) {
                console.log("inside error");
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
      }
    
    if (password.length < 6) {
        toast.error("Password length must be greater than 6");
        return false;
    }
    return true;
}