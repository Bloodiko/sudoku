import { atom, computed } from 'nanostores';

export const gametime = atom(0);
export const gametimeString = computed(gametime, (gametime) => {
    const time = gametime;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
);



