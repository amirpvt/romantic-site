"use client";

import { useState } from "react";
import OpeningSequence from "@/components/OpeningSequence";
import MoonTransition from "@/components/MoonTransition";
import QuestionSequence from "@/components/QuestionSequence";
import LetterRevealSequence from "@/components/LetterRevealSequence";

type Scene = "opening" | "moon" | "questions" | "letter";

export default function Home() {
  const [scene, setScene] = useState<Scene>("opening");

  if (scene === "opening") {
    return (
      <OpeningSequence
        onComplete={() => {
          setScene("moon");
        }}
      />
    );
  }

  if (scene === "moon") {
    return (
      <MoonTransition
        onComplete={() => {
          setScene("questions");
        }}
      />
    );
  }

  if (scene === "questions") {
    return (
      <QuestionSequence
        onComplete={() => {
          setScene("letter");
        }}
      />
    );
  }

  return <LetterRevealSequence />;
}