import { useState, createContext } from "react";

export const UserContext = createContext();

export default function TriggerContext({ children }) {
  const [trigger, setTrigger] = useState(false);
  
  const [notifications, setNotifications] = useState([]);


  return (
    <UserContext.Provider value={{ trigger, setTrigger,notifications, setNotifications }}>
      {children}
    </UserContext.Provider>
  );
}
