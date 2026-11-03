import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnalyticsConsent } from "../analytics/AnalyticsConsent";
import { AnalyticsController } from "../analytics/AnalyticsController";

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet key={location.pathname} />
      </main>
      <Footer />
      <AnalyticsController />
      <AnalyticsConsent />
    </div>
  );
}
