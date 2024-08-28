
import Hero from "../components/Hero"
import ProductPage from "./Products";
import StarsCanvas from "../components/StarBackground";

export default function Home(props) {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero playAudio={props.playAudio} setPlayAudio={props.setPlayAudio} script={props.script} setScript={props.setScript} />
      </div>
    </main>
  )};