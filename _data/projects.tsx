export type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    outsideLink: boolean;
}

export const projects: Project[] = [
    {
        title: "Beat the ATS",
        description: "This is a tool written in python that takes your resume and a specific job description and analyzes the most important keywords to include in your resume to get reccomended by ATS software.",
        image: "/keyword.png",
        link: "#",
        outsideLink: false
    },
    {
        title: "Ctrl-C Ctrl-Eat",
        description: "This was my senior capstone project. It is a fully featured digital recipe book that allows users to create, edit, and share recipes with others. It was built using ASP.NET Core, Entity Framework, and a MySQL Server.",
        image: "/CtrlC.png",
        link: "https://ctrlc-ctrleat-cqbph7fxbhcpdzh0.centralus-01.azurewebsites.net/",
        outsideLink: true
    },
    {
        title: "OnTime",
        description: "This is a group project for a Software Engineering course. It is a FireBase single page application that allows creating, managing, and notification of tasks. It was built using FireBase, JavaScript, and a Firestore database.",
        image: "/ontimeLogo.png",
        link: "https://ontime.treymakesthings.com",
        outsideLink: true
    },
    {
        title: "Trey Makes Things",
        description: "I made this thing to show other things I've made. This was my first time using Next.js so beyond being functional it was a good way to learn. I strive to have more \"silly\" projects than serious ones.",
        image: "/nextjs.png",
        link: "/projects",
        outsideLink: false
    },
    {
        title: "Virtual Interview",
        description: "This is just a random idea I had while using NotebookLM. This is *supposed* to be a tool that you can ask questions as if I was being interviewed and it *should* spit out answers in about the same way that I would answer. ",
        image: "/stick-figure.png",
        link: "#",
        outsideLink: false
    }
]