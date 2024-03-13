import React, { createContext, useState, useContext, ReactNode } from 'react';

type ProviderContextType = {
    Blog: string;
    updateBlog: (language: string) => void;
};
const ProviderContext = createContext<ProviderContextType>({
    Blog: '',
    updateBlog: () => { },
});

interface ProviderProps {
    children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [Blog, setBlog] = useState('');

    const updateBlog = (language: string) => {
        setBlog(language);
    };

    return (
        <ProviderContext.Provider value={{ Blog, updateBlog }}>
            {children}
        </ProviderContext.Provider>
    );
};

export const useProvider = (): ProviderContextType => useContext(ProviderContext);
