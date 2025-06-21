"use client"

import { useState } from "react";
import MuteButton from "@/components/mute-button";
import AboutButton from "@/components/about-button";
import VideoInfoText from "@/components/video-info";
import VideoPlayer from "@/components/video-player";
import BrowseButton from "@/components/browse-button";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [videoTitle, setVideoTitle] = useState("");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleMuteToggle = () => setIsMuted((prev) => !prev);

  return (
    <main className="w-screen h-screen">
      {/* duration counter */}
      <div className="fixed top-2 left-2 text-lg">
        <p>{Math.floor(currentTime)}</p>
      </div>

      {/* ui buttons */}
      <div>
        <div className="flex gap-1 fixed bottom-2 left-2">
          <AboutButton />
          <BrowseButton onVideoSelect={setSelectedVideoIndex} />
          <MuteButton isMuted={isMuted} onToggle={handleMuteToggle} />
        </div>
        <div className="flex fixed bottom-2 right-2 text-sm [writing-mode:vertical-lr] rotate-180 sm:[writing-mode:unset] sm:rotate-0">
          <VideoInfoText title={videoTitle} />
        </div>
      </div>

      {/* video */}
      <div className="w-full h-full flex items-center justify-center">
        <VideoPlayer 
          isMuted={isMuted} 
          onTitleChange={setVideoTitle} 
          selectedVideoIndex={selectedVideoIndex}
          onVideoIndexChange={setSelectedVideoIndex}
          onTimeUpdate={setCurrentTime}
        />
      </div>
    </main>
  );
}