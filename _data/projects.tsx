export type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    outsideLink: boolean;
}

export const projects: Project[] = [
    {
        title: "Trey Makes Things",
        description: "I made this thing to show off other things I've made. This was my first time using TypeScript and React so beyond being functional it was a good way to learn. I strive to have more \"silly\" projects than serious ones.",
        image: "/nextjs.png",
        link: "/lol",
        outsideLink: false
    },
    {
        title: "Ctrl-C Ctrl-Eat",
        description: "This was my senior capstone project. It is a fully featured digital recipe book that allows users to create, edit, and share recipes with others. It loads slow becuase it is using Azure shared resources tier for hosting.",
        image: "/CtrlC.png",
        link: "https://ctrlc-ctrleat-cqbph7fxbhcpdzh0.centralus-01.azurewebsites.net/Login?LoginEmail=test@example.com&LoginPassword=password",
        outsideLink: true
    },
    {
        title: "OnTime",
        description: "This is a group project for a Software Engineering course. It is a FireBase single page application that allows creating, managing, and notification of tasks. It was built using FireBase, JS, and a Firestore database.",
        image: "/ontimeLogo.png",
        link: "https://ontime.treymakesthings.com?email=example@example.com&password=password",
        outsideLink: true
    },
    {
        title: "Beat the ATS",
        description: "This is a tool written in python that takes your resume and a specific job description and analyzes the most important keywords to include in your resume to get reccomended by ATS software.",
        image: "/keyword.png",
        link: "/keyword-check",
        outsideLink: false
    },
    {
        title: "HTML / CSS Resume",
        description: "My HTML/CSS was rusty when I started developing this site so I made a resume only using HTML and CSS just as a warm up. This resume is slow to be updated.",
        image: "/resume.png",
        link: "/resume",
        outsideLink: false
    },
    {
        title: "JSON Generator",
        description: "Parses image metadata for GPS coordinates and the timestamp. Then it assembles a JSON object using that info that Trey's World uses to display the pics by country. This one is more for me than you. :)",
        image: "/json.png",
        link: "/json-generator",
        outsideLink: false
    },
    {
        title: "Virtual Interview",
        description: "This is just a random idea I had while using Google's NotebookLM. This is *supposed* to be a tool that you can ask questions as if I was being interviewed and it *should* spit out answers in about the same way that I would answer. ",
        image: "/stick-figure.png",
        link: "https://notebooklm.google.com/notebook/75344a0d-c6e4-48e7-b151-3da4c93eadd6",
        outsideLink: true
    },
]