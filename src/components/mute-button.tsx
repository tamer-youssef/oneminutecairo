import { Button } from '@/components/ui/button';
import { Volume2, VolumeOff } from 'lucide-react';

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

export default function MuteButton({ isMuted, onToggle }: MuteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
    >
      {isMuted ? <VolumeOff className="size-4" /> : <Volume2 className="size-4" />}
    </Button>
  );
}

