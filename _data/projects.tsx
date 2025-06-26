type Project = {
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
        link: "https://github.com/ctrl-c-ctrl-eat/ctrl-c-ctrl-eat",
        outsideLink: true
    },
    {
        title: "OnTime",
        description: "This is a project I made for a Software Engineering course. It is a FireBase single page application that allows creating, managing, and notification of tasks. It was built using FireBase, JavaScript, and a Firestore database.",
        image: "/ontimeLogo.png",
        link: "https://ontime.treymakesthings.com",
        outsideLink: true
    }
]