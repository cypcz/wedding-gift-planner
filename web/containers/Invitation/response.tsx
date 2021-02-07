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
  const { data, loading, error } = useInvitationQuery({
    variables: { id: id as string },
  });

  if (loading) {
    return <Logo />;
  }

  if (error) {
    router.replace(Routes.AUTH.path);
    return <Logo />;
  }

  const invitation = data?.guestInvitation;
  const isInvitationAccepted = invitation?.status === GuestStatus.Accepted;

  return isGoodbye ? (
    <>
      <h3>Thank you anyway!</h3>
      <SubmitButton onClick={() => setGoodbye(false)}>
        I changed my mind!
      </SubmitButton>
    </>
  ) : (
    <>
      <h3>
        You&apos;ve {isInvitationAccepted ? "accepted" : "declined"} invitation
        to
      </h3>
      <h3>
        {invitation?.wedding.partner1Name} & {invitation?.wedding.partner2Name}
        &apos;s wedding
      </h3>
      <h3>Would you like to send us a gift?</h3>
      <div>
        <SubmitButton
          onClick={() =>
            router.push({
              pathname: Routes.INVITATION_GIFTS.path,
              query: router.query,
            })
          }
        >
          Yes, please!
        </SubmitButton>
        <SubmitButton onClick={() => setGoodbye(true)}>
          No, I&apos;m good.
        </SubmitButton>
      </div>
    </>
  );
};

export default InvitationResponse;
