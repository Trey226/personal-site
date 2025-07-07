export type Interest = {
    linkType: string;  //youtube, research, website,
    stuffType: string //compsci, econ, random
    link: string;  //URL
    description: string; // 5 words or so
}

export const interestData: Interest[] = [

    {
        linkType: "research", 
        stuffType: "compsci", 
        link: "https://arxiv.org/pdf/2506.08872v1", 
        description: "Your Brain on ChatGPT"
    },
    {
        linkType: "youtube", 
        stuffType: "econ", 
        link: "https://www.youtube.com/watch?v=mScpHTIi-kM", 
        description: "Game Theory: tit for tat"
    },
    {
        linkType: "web", 
        stuffType: "random", 
        link: "https://neal.fun/", 
        description: "Great personal site"
    },
    {
        linkType: "youtube", 
        stuffType: "random", 
        link: "https://www.youtube.com/@pbsspacetime", 
        description: "PBS Space Time"
    },
    {
        linkType: "youtube", 
        stuffType: "econ", 
        link: "https://www.youtube.com/playlist?list=PLAoukTI-9JbdQu6NotGKJ--XMrmebCB_u", 
        description: "Macro Econ reference"
    },
    {
        linkType: "research", 
        stuffType: "compsci", 
        link: "https://arxiv.org/pdf/1706.03762", 
        description: "The birth of the Transformer"
    },
    {
        linkType: "web", 
        stuffType: "compsci", 
        link: "https://www.onlinegdb.com/online_c++_compiler", 
        description: "Online C++ compiler"
    },
    {
        linkType: "web", 
        stuffType: "econ", 
        link: "https://en.wikipedia.org/wiki/Nudge_theory", 
        description: "Nudges"
    },
    {
        linkType: "research", 
        stuffType: "econ", 
        link: "https://pdf.sciencedirectassets.com/271667/1-s2.0-S0167487024X00033/1-s2.0-S0167487024000485/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLWVhc3QtMSJHMEUCIExiVtLWvBilDcu%2F2RVQVYkTBDyD1D5XhttT6epnpmurAiEAmHnEzLljl2I2DbjdxLMoLYM93x97%2F0FwQ7xCgO5Nu3UqsgUIfRAFGgwwNTkwMDM1NDY4NjUiDKE9PLltTKaytG4MgSqPBftlZvJNkZeTkDNNctI5xgBM3S7so0HTwqjXHtj6rz%2Fhk%2FRP0clPFbTbh3BSkZD%2FEqXuIZNmucfot8iUi3SJ8mrY3C0rwVf3T55tpSymHKEYFR%2BH4xfZEhUQjsGUqeePX0aTfczrirNNyHEQMXMd1pVXsvK6FA21S5AuBuR0Q7HJcsdkcGyEhisYO%2B9puF2edf40QVK33Qk4MVx1OBz49SoAnTc8bibT9Ux8iCcfGjmyBqmay4t%2BsMONpjQ3oUTM%2BdhhDwX5eFxltQWtFYVFxMcmM6Y9Pt5uAYpaCrQi%2BSwv4TkpEa51i8EtQ0IXoOIBYRffXR%2BuO%2FC34tWMFB%2BifcifOzY2r5rEYcBZAEiZ3XJZ3YnjGvoiiV%2BFxKHJ7xDET555sWXlQm0E3H8Psxhgfy56ir3YdoV1y9CkBRKvSNn%2FCJjagTwK%2Fc5Kf9cr2P9GTGJuRdWN5dl2fLziFCGJysMSMUQH0xIovSj8Vh6sTrDGYUfm%2FKt1n8lJd5INB%2BEz39jAGo5pjbej3cF82%2F6BO8NOxaexC5HRKwjkVVK7jFKIap7fW5TiNY4vFjyY6WQjNUUaJTsk%2BE3MVreAc73fH0FxLuubBMXM4F%2B0%2F5YIxltNLHlbO99WPBhk0a7R8FBEyBOQom%2B9bYKQuEijZ8Bf1%2FfreQrJQrldp7DHJ1U%2FO6ZuSVGxHmYw3L9lLXtvW68xfI0Wja25%2BRLlmxtD4yKabL72zwkXyKqBJEhT4ED67%2BakckCri4EXtLoy8QZureblLmOvDjRJjge9SUG1cBeBJB0NZPrppYnpW0A6C656goOqUJzar8EVysL9Gsmew4v%2B6Badnoi9Rlz8%2FxwGdMR3glvKpWBiUqRWEI%2FI9tg5FnkwwtGwwwY6sQEhcZpKIhL8cOXMB5acQy3uMvx9Oe4yOGiJfmuGAM3obauSITjn8SO%2FF%2FQjIn86SPl8bWizGcrUeX44RjXHaDlJILFTIT1Nqs3ZzsuN3UZRMrIaQ%2FOZPM80L%2BbjNyEWOUfXUC0bxbP7MB0Gj1Sq3lK8JDqD8qpWwONClAU8iaGNUP1czBenqNPhpcV3HioPaxIOfoLB9KGKQW4jbpJAeP8loaJYCSEQYpfOBIyMPgAJGVs%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250707T205037Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTYTBATGEKF%2F20250707%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e98da674d7db0ba3bd311fa44681a10af61f9c5f3537e534b84c67f5724b46ac&hash=4b24e584f2606782d624bd8ebd83833e3f0a6cbe3933834f4b62eb1ae93a1f55&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=S0167487024000485&tid=spdf-3f5940ff-9eb8-4a0f-9c9e-dc2e02186e8e&sid=8b256da6675d684fc8688642daa3eba50d52gxrqa&type=client&tsoh=d3d3LnNjaWVuY2VkaXJlY3QuY29t&rh=d3d3LnNjaWVuY2VkaXJlY3QuY29t&ua=0f155d5306015453535751&rr=95ba37172cf05db5&cc=us", 
        description: "Loss Aversion in Risky Contexts"
    },
    {
        linkType: "", 
        stuffType: "", 
        link: "", 
        description: ""
    },
    {
        linkType: "", 
        stuffType: "", 
        link: "", 
        description: ""
    },
    

]