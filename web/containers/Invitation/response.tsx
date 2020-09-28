import { GuestStatus, useInvitationQuery } from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import { useRouter } from "next/router";
import { useState } from "react";

const InvitationResponse = () => {
  const router = useRouter();
  const [isGoodbye, setGoodbye] = useState(false);
  const id = router.query.id;
  const { data, loading, error } = useInvitationQuery({ variables: { id: id as string } });

  if (loading) {
    return <>loading..</>;
  }

  if (error) {
    router.replace("/auth");
    return <></>;
  }

  const invitation = data?.guestInvitation;
  const isInvitationAccepted = invitation?.status === GuestStatus.Accepted;

  return isGoodbye ? (
    <>
      <h3 className="font-corsiva text-center mb-4 text-2xl">Thank you anyway!</h3>
      <button
        className="flex flex-col items-center mx-auto focus:outline-none"
        onClick={() => setGoodbye(false)}
      >
        <span className="font-corsiva text-3xl">I changed my mind!</span>
        <div className="flex">
          <Dot className="h-1 w-1" />
          <Dot className="h-1 w-1 mx-2" />
          <Dot className="h-1 w-1" />
        </div>
      </button>
    </>
  ) : (
    <>
      <h3 className="font-corsiva text-center mb-4 text-2xl">
        You've {isInvitationAccepted ? "accepted" : "declined"} invitation to
      </h3>
      <h3 className="font-corsiva text-center mb-4 text-2xl">
        {invitation?.wedding.partner1Name} & {invitation?.wedding.partner2Name}'s wedding
      </h3>
      <h3 className="font-corsiva text-center mb-4 text-2xl">Would you like to send us a gift?</h3>
      <div className="flex">
        <button
          className="flex flex-col items-center mx-auto focus:outline-none"
          onClick={() => router.push({ pathname: "/invitation/gifts", query: router.query })}
        >
          <span className="font-corsiva text-3xl">Yes, please!</span>
          <div className="flex">
            <Dot className="h-1 w-1" />
            <Dot className="h-1 w-1 mx-2" />
            <Dot className="h-1 w-1" />
          </div>
        </button>
        <button
          className="flex flex-col items-center mx-auto focus:outline-none"
          onClick={() => setGoodbye(true)}
        >
          <span className="font-corsiva text-3xl">No, I'm good.</span>
          <div className="flex">
            <Dot className="h-1 w-1" />
            <Dot className="h-1 w-1 mx-2" />
            <Dot className="h-1 w-1" />
          </div>
        </button>
      </div>
    </>
  );
};

export default InvitationResponse;
