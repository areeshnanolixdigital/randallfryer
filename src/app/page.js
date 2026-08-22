import Hero from "@/sections/Hero";
import WhyRunning from "@/sections/WhyRunning";
import Platform from "@/sections/Platform";
import Endorsements from "@/sections/Endorsements";
import Countdown from "@/sections/Countdown";
import SitePaused from "@/components/ui/SitePaused";

// Site is temporarily paused. Set back to false to restore the live homepage.
const SITE_PAUSED = true;

export default function HomePage() {
  if (SITE_PAUSED) return <SitePaused />;

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
