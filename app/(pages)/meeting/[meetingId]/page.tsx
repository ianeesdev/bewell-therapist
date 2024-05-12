"use client";

import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    meetingId: string;
  };
}

export default function Page({ params }: PageProps) {
  const { meetingId } = params;
  const { therapist } = useSelector((state: any) => state.auth);
  const elementRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 1039959667;
      const serverSecret = "f6bddb379bb410e9c4d071bd38188f14";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        meetingId,
        therapist?._id,
        therapist?.name
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      if (elementRef.current) {
        zc.joinRoom({
          container: elementRef.current,
          sharedLinks: [{
            name: "Copy Link",
            url: `http://localhost:3000/meeting/${meetingId}`
          }],
          onLeaveRoom: () => router.push("/appointment"),
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
      }
    };

    myMeeting();
  }, [meetingId, therapist]);

  return <div ref={elementRef} style={{ width: '100vw', height: '100vh' }}></div>;
}
