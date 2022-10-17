
export type Communication = {
    comFunctions: {
        register: (name: string, callback: (data: any) => void) => void;
        unregister: (name: string) => void;
        call: (name: string, data: any) => void;
    };
    registry: {
        [key: string]: (data: any) => void;
    };
};
