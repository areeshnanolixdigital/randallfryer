import Hero from "@/sections/Hero";
import WhyRunning from "@/sections/WhyRunning";
import Platform from "@/sections/Platform";
import Endorsements from "@/sections/Endorsements";
import Countdown from "@/sections/Countdown";

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <Hero />
      <WhyRunning />
      <Platform />
      <Endorsements />
      <Countdown />
    </main>
  );
}
