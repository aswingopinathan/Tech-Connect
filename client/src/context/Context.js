import { useState, createContext } from "react";

export const UserContext = createContext();

export default function TriggerContext({ children }) {
  const [trigger, setTrigger] = useState(false);

  return (
    <UserContext.Provider value={{ trigger, setTrigger }}>
      {children}
    </UserContext.Provider>
  );
}
