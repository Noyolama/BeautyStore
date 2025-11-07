import { Loader } from "@/components/atoms/Loader";
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
    isLoading: false,
    setLoading: (_: boolean) => { }
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false)

    const setLoading = (value: boolean) => {
        setIsLoading(value)
    }

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
            {
                isLoading && (
                    <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50 backdrop-blur-[0.65px]">
                        <Loader />
                    </div>
                )
            }
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext)
