import { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function Home() {
  return (
    <main>
      <div className="content-area-home">
        <div className="pic-links">
          <div className="pic">
            <div className="pic-container">
              <img src="/pfp.jpg" width={300} height={300} alt="my profile picture" />
            </div>
          </div>
          <div className="links">
            <a href="https://linkedin.com/in/Trey226" target="_blank" rel="noopener noreferrer"><img src="/LinkedIn.png" alt="LinkedIn" width={85} height={85} className="icon" /></a>
            <a href="https://discord.gg/GQXdTJmy3N" target="_blank" rel="noopener noreferrer"><img src="/Discord.svg" alt="Discord" width={85} height={85} className="icon" /></a>
            <a href="https://github.com/Trey226" target="_blank" rel="noopener noreferrer"><img src="GitHub-lightmode.svg" alt="Github" width={75} height={75} className="only-on-light icon" /></a>
            <a href="https://github.com/Trey226" target="_blank" rel="noopener noreferrer"><img src="GitHub-darkmode.svg" alt="Github" width={75} height={75} className="only-on-dark icon" /></a>
          </div>
        </div>
        <div className="bio">
          <h1 className="greeting">Hi, I'm Trey!</h1>
          <br />
          <p className="general-text-home">
            I'm a software engineer that wanted a place to display projects I have made. Prior to this website I had not done very much web development so this was also a way for me to learn 
            TypeScript and React. Have fun clicking around and feel free to check out the github repo for this project if you want to see how I made it.
          </p>
          <br />
          <p className="general-text-home">
            Every component on this site (besides the clickable map) were custom made by me just for practice. That means that sometimes the layout, 
            especially on mobile, could be better. For the most part everything works :)
          </p>
        </div>
      </div>
    </main>
  );
}
