import { GuestStatus, useInvitationQuery } from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import Logo from "@components/Icons/Logo";
import { Routes } from "@utils/constants";
import { useRouter } from "next/router";
import { useState } from "react";

const InvitationResponse = () => {
  const router = useRouter();
  const [isGoodbye, setGoodbye] = useState(false);
  const id = router.query.id;
  const { data, loading, error } = useInvitationQuery({ variables: { id: id as string } });

  if (loading) {
    return <Logo className="animate-ping" />;
  }

  if (error) {
    router.replace(Routes.AUTH.path);
    return <Logo className="animate-ping" />;
  }

  const invitation = data?.guestInvitation;
  const isInvitationAccepted = invitation?.status === GuestStatus.Accepted;

  return isGoodbye ? (
    <>
      <h3 className="font-corsiva text-center mb-4 text-2xl">Thank you anyway!</h3>
      <SubmitButton onClick={() => setGoodbye(false)}>I changed my mind!</SubmitButton>
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
        <SubmitButton
          onClick={() =>
            router.push({ pathname: Routes.INVITATION_GIFTS.path, query: router.query })
          }
        >
          Yes, please!
        </SubmitButton>
        <SubmitButton onClick={() => setGoodbye(true)}>No, I'm good.</SubmitButton>
      </div>
    </>
  );
};

export default InvitationResponse;
