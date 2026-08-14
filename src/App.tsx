import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { RSVP } from './components/RSVP';
import { Locations } from './components/Locations';
import { Guestbook } from './components/Guestbook';
import { DressCode } from './components/DressCode';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';
import { Admin } from './components/Admin';
import { addRSVPEntry } from './lib/rsvp';

function useIsAdminRoute() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#/admin');

  useEffect(() => {
    const onHashChange = () => {
      setIsAdmin(window.location.hash === '#/admin');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return isAdmin;
}

export default function App() {
  const isAdmin = useIsAdminRoute();

  const handleRSVPSubmit = async (data: {
    name: string;
    attending: 'yes' | 'no';
    guestCount: number;
    dietaryRestrictions?: string;
    message?: string;
  }) => {
    await addRSVPEntry(
      data.name,
      data.attending,
      data.guestCount,
      data.dietaryRestrictions ?? '',
      data.message ?? ''
    );
  };

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      <main>
        <Hero />

        <Timeline />

        <RSVP onSubmit={handleRSVPSubmit} />

        <Locations />

        <Guestbook />

        <DressCode />
      </main>

      <Footer />

      <AudioPlayer />
    </div>
  );
}
