
export type Communication = {
    comFunctions: {
        register: (name: string, callback: (data: any) => void) => void;
        unregister: (name: string) => void;
        call: ((name: string, data?: any) => void);
        callWithReturn: ((name: string, data?: any) => any);
    };
    registry: {
        [key: string]: (data: any) => void;
    };
};
