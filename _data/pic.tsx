import { allPics } from "./onlyPics"

export type pic = {
    src: string, // filepath
    country: string  // 2 letter ISO code
    date: string // "month / year"
}


export function getCountrySpecificPics(code:string){
    let countrySpecificPics = [];

    for (let index = 0; index < allPics.length; index++) {
        const element = allPics[index];

        if(element.country === code){
            countrySpecificPics.push(element.src)
        }
        
    }

    return countrySpecificPics;
}