interface VideoInfoTextProps {
  title: string;
}

export default function VideoInfoText({ title }: VideoInfoTextProps) {
  return (
    <div>
      {title}
    </div>
  );
}