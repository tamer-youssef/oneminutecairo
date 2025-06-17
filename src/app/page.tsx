"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MuteButton from "@/components/mute-button";
import AboutButton from "@/components/about-button";
import VideoInfoText from "@/components/video-info";
import VideoPlayer from "@/components/video-player";
import BrowseButton from "@/components/browse-button";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [videoTitle, setVideoTitle] = useState("");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // handle URL parameter on initial load
  useEffect(() => {
    const videoId = searchParams.get('v');
    if (videoId !== null) {
      const index = parseInt(videoId);
      if (!isNaN(index)) {
        setSelectedVideoIndex(index);
      }
    }
  }, [searchParams]);

  // update URL when video changes
  const handleVideoIndexChange = (index: number | null) => {
    setSelectedVideoIndex(index);
    if (index !== null) {
      router.push(`/?v=${index}`, { scroll: false });
    } else {
      router.push('/', { scroll: false });
    }
  };

  const handleMuteToggle = () => setIsMuted((prev) => !prev);

  return (
    <main className="w-screen h-screen">
      {/* ui buttons */}
      <div>
        <div className="flex gap-1 fixed bottom-2 left-2">
          <AboutButton />
          <BrowseButton onVideoSelect={setSelectedVideoIndex} />
          <MuteButton isMuted={isMuted} onToggle={handleMuteToggle} />
        </div>
        <div className="flex gap-1 fixed bottom-2 right-2 text-sm [writing-mode:vertical-lr] rotate-180 sm:[writing-mode:unset] sm:rotate-0">
          <VideoInfoText title={videoTitle} />
        </div>
      </div>

      {/* video */}
      <div className="w-full h-full flex items-center justify-center">
        <VideoPlayer 
          isMuted={isMuted} 
          onTitleChange={setVideoTitle} 
          selectedVideoIndex={selectedVideoIndex}
          onVideoIndexChange={handleVideoIndexChange}
        />
      </div>
    </main>
  );
}