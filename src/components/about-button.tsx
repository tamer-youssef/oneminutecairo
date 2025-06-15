import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getArenaVideos } from "@/lib/arena";
import { getContributors } from "@/lib/contributors";

interface Contributor {
  contributorName: string;
  socialLink?: string;
}

export default function AboutButton() {
  const [minsCount, setMinsCount] = useState<number | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [videos, contributorsData] = await Promise.all([
          getArenaVideos(),
          getContributors()
        ]);
        setMinsCount(videos.length);
        setContributors(contributorsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setMinsCount(null);
        setContributors([]);
      }
    }
    fetchData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <CircleHelp className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/20 backdrop-blur-3xl max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">One Minute Cairo</DialogTitle>
          <div className="flex flex-col gap-4 text-left text-pretty">

            <section className="text-sm text-muted-foreground">
              <p className="mb-1">Welcome to One Minute Cairo, a digital archive of one minute videos from around Cairo, all filmed by humans like you. The goal is to collect 1440 minutes; enough for every minute in a day.</p>
              <p>{minsCount === null ? "We're having an issue finding out how many minutes we've collected so far. Please check back shortly!" : `We've collected ${minsCount}/1440 minutes so far!`}</p>
            </section>

            <section>
              <div className="text-md font-semibold mb-1">
                how to make a One Minute Cairo
              </div>
              <div className="text-sm text-muted-foreground">
                <ol className="">
                  <li className="mb-1">1. Walk around Cairo until you find a spot you like</li>
                  <li className="mb-1">2. Take note of the date, time, and location</li>
                  <li className="mb-1">3. Pull out your phone's camera, rotate it to landscape, and start recording. Try to hold it still, don't look around. Stop the recording at exactly 1 minute</li>
                  <li className="mb-1">4. Send the video to <Link href="mailto:tameryoussef2@gmail.com" rel="noreferrer" target="_blank" className="text-blue-500 hover:underline">tameryoussef2@gmail.com</Link> with the date, time, location, and your name or social media @ to be featured in One Minute Cairo's contributors section!</li>
                  <li><span className="text-foreground">sample details:</span><br/>17 July 2025 – 4:38 P.M. – Victoria Square, Maadi, Cairo, Egypt</li>
                </ol>
              </div>
            </section>

            <section>
              <div className="text-md font-semibold mb-1">
                contributors
              </div>
              <div className="text-sm text-muted-foreground">
                {contributors.map((contributor, index) => (
                  <span key={contributor.contributorName}>
                    {contributor.socialLink ? (
                      <Link href={contributor.socialLink} rel="noreferrer" target="_blank" className="hover:underline">
                        {contributor.contributorName}
                      </Link>
                    ) : (
                      contributor.contributorName
                    )}
                    {index < contributors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <div className="text-md font-semibold mb-1">
                more stuff
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-1">One Minute Cairo is built by <Link href="https://tamerable.com" rel="noreferrer" target="_blank" className="text-blue-500 hover:underline">tamerable</Link>, and is heavily inspired by Elliot Cost's <Link href="https://oneminutepark.tv" rel="noreferrer" target="_blank" className="text-blue-500 hover:underline">oneminutepark.tv</Link>.</p>
                <p>If you love One Minute Cairo, <Link href="https://linkedin.com/in/tamerable" rel="noreferrer" target="_blank" className="text-blue-500 hover:underline">let Tamer know</Link>, or share the love with a friend.</p>
              </div>
            </section>

          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}