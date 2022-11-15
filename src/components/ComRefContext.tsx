import { useRef, createContext, useEffect } from "react";
import { Communication } from "../types/CommunicationRefContextType";

const communicationContext = createContext({} as { current: Communication });

const CommunicationProvider = (props: { children: any }) => {
    const communicationRef = useRef<Communication>({} as Communication);

    useEffect(() => {
        const register = (name: string, callback: (data: any) => void) => {
            console.log("registering: ", name);
            communicationRef.current.registry[name] = callback;
        }

        const unregister = (name: string) => {
            console.log("unregistering: ", name);
            delete communicationRef.current.registry[name];
        }

        const call = (name: string, data: any) => {
            console.log("calling: ", name);
            if (communicationRef.current.registry[name]) {
                communicationRef.current.registry[name](data);
            }
            else {
                console.log(`No function registered with name ${name}`);
            }
        }

        const callWithReturn = (name: string, data: any) => {
            console.log("calling with return: ", name);
            if (communicationRef.current.registry[name]) {
                return communicationRef.current.registry[name](data);
            }
            else {
                console.log(`No function registered with name ${name}`);
            }
        }

        communicationRef.current = {
            comFunctions: {
                register,
                unregister,
                call,
                callWithReturn
            },
            registry: {}
        }
    }, [])

    useEffect(() => {
        console.log("communication context updated");
        //eslint-disable-next-line
    }, [communicationRef.current])

    return (
        <communicationContext.Provider value={communicationRef}>
            {props.children}
        </communicationContext.Provider>
    )
}

export { communicationContext, CommunicationProvider };

