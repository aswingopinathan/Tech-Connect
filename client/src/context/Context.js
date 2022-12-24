import { useState, createContext } from "react";

export const UserContext = createContext();

export default function TriggerContext({ children }) {
  const [trigger, setTrigger] = useState(false);
  
  const [notifications, setNotifications] = useState([]);

  const [updateNav,setUpdateNav] = useState(false)

  const [chatLoader,setChatLoader] = useState(false)

  const [uniquePost,setUniquePost] = useState(false)


  return (
    <UserContext.Provider value={{ trigger, setTrigger,
    notifications, setNotifications,
    updateNav,setUpdateNav,
    chatLoader,setChatLoader,
    uniquePost,setUniquePost 
    }}>
      {children}
    </UserContext.Provider>
  );
}
