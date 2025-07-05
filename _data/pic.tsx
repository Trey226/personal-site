export type pic = {
    src: string, // filepath
    country: string  // 2 letter country code
    date: string // "month / year"
}

const allPics: pic[] = [
    {
        src: "/twpics/",
        country: "",
        date: ""
    },
    {
        src: "/twpics/",
        country: "",
        date: ""
    },
    {
        src: "/twpics/",
        country: "",
        date: ""
    },
]


export function getCountrySpecificPics(country:string){
    let countrySpecificPics = [];

    for (let index = 0; index < allPics.length; index++) {
        const element = allPics[index];

        if(element.country === country){
            countrySpecificPics.push(element.src)
        }
        
    }

    return countrySpecificPics;
}