import { Metadata } from "next";
import Image from "next/image";
import "./page.css"

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
  };

export default function Home() {
  return (
    <main>
      <div className="content-area">
        <div className="pic-links">
          <div className="pic">
            <div className="pic-container">
              <img src="/pfp.jpg" width={300} height={300} alt="my profile picture" />
            </div>
          </div>
          <div className="links">
            <a href="https://linkedin.com/in/Trey226"><img src="/LinkedIn.png" alt="LinkedIn" width={85} height={85} className="icon" /></a>
            <a href="https://discord.gg/GQXdTJmy3N"><img src="/Discord.svg" alt="Discord" width={85} height={85} className="icon"/></a>
            <a href="https://github.com/Trey226"><img src="GitHub-lightmode.svg" alt="Github" width={75} height={75} className="only-on-light icon"/></a>
            <a href="https://github.com/Trey226"><img src="GitHub-darkmode.svg" alt="Github" width={75} height={75} className="only-on-dark icon"/></a>
          </div>
        </div>
        <div className="bio">
        <h1 className="greeting">Hi, I'm Trey!</h1>
        <br />
        <p className="general-text">side 2ddddddd ddddddddddddd dddddddddddddd ddddddddddd ddddddddd ddddddddddddddd dddddddd dddddddddddddddddd</p>
        </div>
      </div>
    </main>
  );
}
