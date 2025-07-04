type pic = {
    src: string,
    country: string
}

const allPics: pic[] = [
    {
        src: "/twpics/",
        country: ""
    },
    {
        src: "/twpics/",
        country: ""
    },
    {
        src: "/twpics/",
        country: ""
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