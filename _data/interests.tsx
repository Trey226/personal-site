export type Interest = {
    linkType: string;  //youtube, research, website,
    stuffType: string //compsci, econ, random
    link: string;  //URL
    description: string; // 5 words or so
}

export const interestData: Interest[] = [

    {
        linkType: "youtube", 
        stuffType: "compsci", 
        link: "/interests", 
        description: "This is my favorite stuff! what happens if two rows?"
    },
    {
        linkType: "web", 
        stuffType: "compsci", 
        link: "/interests", 
        description: "This is my favorite stuff!"
    },
    {
        linkType: "research", 
        stuffType: "compsci", 
        link: "/interests", 
        description: "This is my favorite stuff!"
    },
    {
        linkType: "research", 
        stuffType: "econ", 
        link: "/interests", 
        description: "This is my favorite stuff!"
    },
    {
        linkType: "web", 
        stuffType: "econ", 
        link: "/interests", 
        description: "This is my favorite stuff!"
    },
    {
        linkType: "youtube", 
        stuffType: "random", 
        link: "/", 
        description: "This is my favorite stuff!"
    },
    {
        linkType: "web", 
        stuffType: "random", 
        link: "/interests", 
        description: "This is my favorite stuff!"
    },
    {
        linkType: "youtube", 
        stuffType: "random", 
        link: "/interests", 
        description: "This is my favorite stuff!"
    },
    {
        linkType: "web", 
        stuffType: "random", 
        link: "/interests", 
        description: "This is my favorite stuff!"
    },

]