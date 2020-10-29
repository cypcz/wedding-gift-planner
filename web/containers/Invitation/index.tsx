import {
  GuestStatus,
  InvitationDocument,
  InvitationQuery,
  useInvitationQuery,
  useRespondToInvitationMutation,
} from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import Dot from "@components/Dot";
import Logo from "@components/Icons/Logo";
import { DAY_DATE_TIME_FORMAT, Routes } from "@utils/constants";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";

type PageStatus = "init" | "accept" | "decline";

const Invitation = () => {
  const router = useRouter();
  const [pageStatus, setPageStatus] = useState<PageStatus>("init");
  const id = router.query.id;
  const { data, loading, error } = useInvitationQuery({ variables: { id: id as string } });
  const [respond, { loading: respondLoading }] = useRespondToInvitationMutation();

  if (loading) {
    return <Logo className="animate-ping" />;
  }

  if (error) {
    router.replace(Routes.AUTH.path);
    return <Logo className="animate-ping" />;
  }

  const invitation = data?.guestInvitation;

  if (invitation?.status !== GuestStatus.Waiting) {
    router.push({ pathname: Routes.INVITATION_RESPONSE.path, query: router.query });
    return <Logo className="animate-ping" />;
  }

  const handleRespond = async (status: GuestStatus) => {
    await respond({
      variables: { id: id as string, status },
      update: (cache, { data }) => {
        const existingData = cache.readQuery({
          query: InvitationDocument,
          variables: { id: id as string },
        }) as InvitationQuery;

        cache.writeQuery({
          query: InvitationDocument,
          variables: { id: id as string },
          data: {
            guestInvitation: {
              ...existingData.guestInvitation,
              status: data?.respondToInvitation.status,
            },
          },
        });
      },
    });
    await router.push({ pathname: Routes.INVITATION_RESPONSE.path, query: router.query });
  };

  const isAccept = pageStatus === "accept";
  const isInit = pageStatus === "init";

  return (
    <>
      <h3 className="font-corsiva text-center mb-4 text-2xl">You've been invited to </h3>
      <h2 className="font-corsiva text-center mb-4 text-4xl">
        {invitation?.wedding.partner1Name} & {invitation?.wedding.partner2Name}'s
      </h2>
      <h3 className="font-corsiva text-center mb-4 text-2xl">wedding</h3>
      <Dot className="h-1 w-1 mb-4" />
      <h3 className="font-corsiva text-center mb-4 text-2xl">
        {format(parseISO(invitation?.wedding.date), DAY_DATE_TIME_FORMAT)}
      </h3>
      <h3 className="font-corsiva text-center mb-4 text-2xl">{invitation?.wedding.location}</h3>
      <h3 className="font-corsiva text-center mb-4 text-4xl">
        {isInit
          ? `${invitation?.firstName} ${invitation?.lastName}`
          : isAccept
          ? "You accept the invitation"
          : "You decline the invitation"}
      </h3>
      <div className="flex">
        <SubmitButton
          disabled={respondLoading}
          onClick={
            isInit
              ? () => setPageStatus("accept")
              : () =>
                  isAccept
                    ? handleRespond(GuestStatus.Accepted)
                    : handleRespond(GuestStatus.Declined)
          }
        >
          {isInit ? "Accept" : `That's correct`}
        </SubmitButton>
        <SubmitButton
          disabled={respondLoading}
          onClick={isInit ? () => setPageStatus("decline") : () => setPageStatus("init")}
        >
          {isInit ? "Decline" : "I made a mistake!"}
        </SubmitButton>
      </div>
    </>
  );
};

export default Invitation;
