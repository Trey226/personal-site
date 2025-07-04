import { Metadata } from "next";
import "./globals.css"
import LightModePopup from "@/components/LightModePopup";

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
            <a href="https://discord.gg/GQXdTJmy3N" target="_blank" rel="noopener noreferrer"><img src="/Discord.svg" alt="Discord" width={85} height={85} className="icon"/></a>
            <a href="https://github.com/Trey226" target="_blank" rel="noopener noreferrer"><img src="GitHub-lightmode.svg" alt="Github" width={75} height={75} className="only-on-light icon"/></a>
            <a href="https://github.com/Trey226" target="_blank" rel="noopener noreferrer"><img src="GitHub-darkmode.svg" alt="Github" width={75} height={75} className="only-on-dark icon"/></a>
          </div>
        </div>
        <div className="bio">
        <h1 className="greeting">Hi, I'm Trey!</h1>
        <br />
        <p className="general-text-home">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum.
        </p>
        <br />
        <p className="general-text-home">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum.
        </p>
        </div>
      </div>
      <LightModePopup />
    </main>
  );
}
