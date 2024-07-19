import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AnimeContext = createContext()

export const AnimeProvider = ({children})=>{
    const [userType, setUserType] = useState("");
    
    return (
        <AnimeContext.Provider value={{ userType, setUserType }}>
          {children}
        </AnimeContext.Provider>
      );
}

export const useAnimeContext = () => useContext(AnimeContext);
