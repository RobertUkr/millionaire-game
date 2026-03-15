"use client";

import HeroScreen from "@/components/HeroScreen";

const NotFound = () => (
  <HeroScreen
    subtitle="Error 404"
    title="Page not found"
    buttonLabel="Go home"
    onAction={() => {
      window.location.href = "/";
    }}
  />
);

export default NotFound;
