import { useRef, createContext, useEffect } from "react";
import { Communication } from "../types/CommunicationRefContextType";

const communicationContext = createContext({} as { current: Communication });

const CommunicationProvider = (props: { children: any }) => {
    const communicationRef = useRef<Communication>({} as Communication);

    useEffect(() => {
        const register = (name: string, callback: (data: any) => void) => {
            communicationRef.current.registry[name] = callback;
        }

        const unregister = (name: string) => {
            delete communicationRef.current.registry[name];
        }

        const call = (name: string, data: any) => {
            if (communicationRef.current.registry[name]) {
                communicationRef.current.registry[name](data);
            }
        }

        communicationRef.current = {
            comFunctions: {
                register,
                unregister,
                call
            },
            registry: {}
        }
    }, [])

    return (
        <communicationContext.Provider value={communicationRef}>
            {props.children}
        </communicationContext.Provider>
    )
}

export { communicationContext, CommunicationProvider };

