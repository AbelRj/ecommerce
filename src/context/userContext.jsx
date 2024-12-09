import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // Cargar datos desde LocalStorage al inicializar
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem("userData");
        return savedData ? JSON.parse(savedData) : null; // Si hay datos, parsearlos; si no, null.
    });

    // Guardar datos en LocalStorage cuando cambie userData
    useEffect(() => {
        if (userData) {
            localStorage.setItem("userData", JSON.stringify(userData));
        } else {
            localStorage.removeItem("userData"); // Limpia si es null
        }
    }, [userData]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
