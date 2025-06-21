"use client"

import { useEffect, useState, useRef } from 'react';
import { getArenaVideos } from '@/lib/arena';

interface VideoBlock {
  videoUrl: string;
  title?: string;
}

interface VideoPlayerProps {
  isMuted: boolean;
  onTitleChange?: (title: string) => void;
  selectedVideoIndex: number | null;
  onVideoIndexChange: (index: number | null) => void;
  onTimeUpdate?: (time: number) => void;
}

export default function VideoPlayer({ isMuted, onTitleChange, selectedVideoIndex, onVideoIndexChange, onTimeUpdate }: VideoPlayerProps) {
  const [videos, setVideos] = useState<VideoBlock[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // fetching are.na videos on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getArenaVideos();
        if (!data || data.length === 0) {
          setError("No videos found. Send your contribution to tameryoussef2@gmail.com!");
        } else {
          setVideos(data);
          // pick random video if no video is selected
          if (selectedVideoIndex === null) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setCurrentIndex(randomIndex);
            onVideoIndexChange(randomIndex);
          } else {
            setCurrentIndex(selectedVideoIndex);
          }
          if (onTitleChange) onTitleChange(data[selectedVideoIndex ?? 0].title || "");
        }
      } catch (err) {
        setError("Failed to load videos. It's likely an issue on our end. Please send Tamer a message, he'll know how to fix it.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // update current index when selected video changes
  useEffect(() => {
    if (selectedVideoIndex !== null && selectedVideoIndex !== currentIndex) {
      setCurrentIndex(selectedVideoIndex);
    }
  }, [selectedVideoIndex]);

  // preloading the next video
  useEffect(() => {
    if (videos.length > 1) {
      const nextIndex = (currentIndex + 1) % videos.length;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = videos[nextIndex].videoUrl;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentIndex, videos]);

  // sync mute state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // update title on video change
  useEffect(() => {
    if (onTitleChange && videos[currentIndex]) {
      onTitleChange(videos[currentIndex].title || "");
    }
  }, [currentIndex, videos, onTitleChange]);

  const currentVideo = videos[currentIndex];

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-foreground">... هنا القاهرة</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-foreground text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative -z-99">
        <video
          ref={videoRef}
          key={currentVideo.videoUrl}
          src={currentVideo.videoUrl}
          poster="black.png"
          autoPlay
          muted={isMuted}
          playsInline
          controls={false}
          className="object-cover w-full h-full"
          onTimeUpdate={(e) => onTimeUpdate && onTimeUpdate(e.currentTarget.currentTime)}
          onEnded={() => {
            const nextIndex = (currentIndex + 1) % videos.length;
            setCurrentIndex(nextIndex);
            onVideoIndexChange(nextIndex);
          }}
        />
    </div>
  );
}
