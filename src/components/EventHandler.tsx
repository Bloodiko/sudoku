import React, { useEffect } from "react";

export type CEvent = {
    name: string,
    callback: (data: any) => void
}

type EventHandlerProps = {
    id: string,
    eventlist: CEvent[],
}

const EventHandler = (props: EventHandlerProps) => {


    useEffect(() => {
        const domElement = document.getElementById(props.id);

        props.eventlist.forEach((event) => {
            domElement?.addEventListener(event.name, event.callback);
        })
        return () => {
            props.eventlist.forEach((event) => {
                domElement?.removeEventListener(event.name, event.callback);
            })
        }
    }, [props.eventlist, props.id])


    return (
        <div id={props.id}></div>
    )

}

export default EventHandler;