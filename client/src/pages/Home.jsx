
import Hero from "../components/Hero"
import ProductPage from "./Products";
import StarsCanvas from "../components/StarBackground";
import { useEffect } from "react";

export default function Home(props) {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setLogged(true);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero text={props.text} setText={props.setText} script={props.script} setScript={props.setScript} />
      </div>
    </main>
  )};