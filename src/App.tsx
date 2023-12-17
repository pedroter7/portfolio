import { useEffect } from "react";
import "./App.css";
import Typewriter from "react-ts-typewriter";
import ContactSection from "./components/ContactSection";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const helloTexts = [
  "Hello,",
  "Szia,",
  "Hallo,",
  "Olá,",
  "Привиет,",
  "Hola,",
  "Salut,",
];

const App = () => {
  const backgroundNumber = getRandomNumber(1, 3);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE || '';
    const backgroundImage = `${baseUrl}background_${backgroundNumber}.jpg`;
    const backgroundVideo = `${baseUrl}background_video_${backgroundNumber}.mp4`;

    const video = document.getElementById(
      "backgroundVideo"
    ) as HTMLVideoElement;
    video.addEventListener("ended", () => {
      video.play();
    });

    document.body.style.backgroundImage = `url(${backgroundImage})`;
    video.src = backgroundVideo;

    return () => {
      video.removeEventListener("ended", () => {
        video.play();
      });
    };
  }, [backgroundNumber]);

  return (
    <div className="app-container">
      <div className="overlay"></div>
      <video id="backgroundVideo" autoPlay muted loop />
      <div className="content-box">
        <div className="hello-text">
          <Typewriter text={helloTexts} speed={30} loop delay={1000} />
        </div>
        <p>🚀 Exciting Changes Ahead! 🚀 </p>
        <p>
          Thanks for dropping by! I'm Pedro, a software engineer, and this is my
          portfolio. Currently undergoing a fantastic makeover to provide you
          with an even better experience. Stay tuned for the big reveal!
        </p>
        <ContactSection />
      </div>
    </div>
  );
};

export default App;
