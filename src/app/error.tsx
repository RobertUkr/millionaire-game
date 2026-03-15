"use client";

import HeroScreen from "@/components/HeroScreen";

interface Props {
  reset: () => void;
}

const Error = ({ reset }: Props) => (
  <HeroScreen
    subtitle="Something went wrong"
    title="Please try later"
    buttonLabel="Try again"
    onAction={reset}
  />
);

export default Error;
