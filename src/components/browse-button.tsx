'use client';

import { getArenaVideos } from '@/lib/arena';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LayoutGrid } from 'lucide-react';

interface VideoBlock {
  videoUrl: string;
  title: string;
  thumbnailUrl: string | null;
}

interface BrowseButtonProps {
  onVideoSelect: (index: number | null) => void;
}

export default function BrowseButton({ onVideoSelect }: BrowseButtonProps) {
  const [videos, setVideos] = useState<VideoBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoBlocks = await getArenaVideos();
        setVideos(videoBlocks);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoSelect = (index: number) => {
    onVideoSelect(index);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <LayoutGrid className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/20 backdrop-blur-3xl max-h-[70vh] min-w-[50vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">Library</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">loading archive...</div>
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <div 
                key={index} 
                className="flex flex-col cursor-pointer"
                onClick={() => handleVideoSelect(index)}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  {video.thumbnailUrl ? (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted-foreground flex items-center justify-center">
                      <span className="text-center text-sm text-foreground">thumbnail not found</span>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-sm text-center text-wrap">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
