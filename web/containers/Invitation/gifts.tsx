import { useInvitationQuery } from "@codegen/generated/graphql";
import Logo from "@components/Icons/Logo";
import { Routes } from "@utils/constants";
import { useRouter } from "next/router";

const InvitationGifts = () => {
  const router = useRouter();
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

  const gifts = data?.guestInvitation?.wedding.gifts;

  return (
    <>
      {gifts?.map((gift) => (
        <div key={gift.id}>{gift.name}</div>
      ))}
    </>
  );
};

export default InvitationGifts;
