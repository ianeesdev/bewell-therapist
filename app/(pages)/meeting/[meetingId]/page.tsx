"use client";

import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { handlePaymentCompletion } from "@/app/redux/features/payment/paymentSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 1812045985;
      const serverSecret = "1b4292e3cdaff717f4d0a0f3e19bf09a";
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
          onLeaveRoom: () => afterMeetingLeave(),
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
      }
    };

    myMeeting();
  }, [meetingId, therapist]);

  const afterMeetingLeave = () => {
    dispatch(handlePaymentCompletion());
    router.push("/appointment");
  }

  return <div ref={elementRef} style={{ width: '100vw', height: '100vh' }}></div>;
}
