export async function getArenaVideos() {
  const res = await fetch(`https://api.are.na/v2/channels/oneminutecairo/contents/`);
  const data = await res.json();

  if (!data.contents) {
    console.error('Are.na API response:', data);
    throw new Error('No contents found in channel.');
  }

  // filtering for mp4 attachments and title
  const videoBlocks = data.contents
    .filter(
      (block: any) =>
        block.class === "Attachment" &&
        block.attachment?.url
    )
    .map((block: any) => ({
      videoUrl: block.attachment.url,
      title: block.title || "no details",
      thumbnailUrl: block.image?.display?.url
    }));

  return videoBlocks;
}