import BigButton from "@components/BigButton";
import Table from "@components/Table";
import { UserContext } from "@utils/userContext";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Invitation link",
    accessor: "link",
  },
];

const Guests = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  if (!user?.wedding) {
    router.replace("/wedding");
    return <></>;
  }

  const data = useMemo(
    () =>
      user.wedding?.guests.map((guest) => ({
        name: `${guest.firstName} ${guest.lastName}`,
        status: guest.status,
        link: (
          <CopyToClipboard text={guest.guestLink} onCopy={() => console.log("copied")}>
            <span>Click to copy invitation link</span>
          </CopyToClipboard>
        ),
      })),
    []
  );

  return (
    <main className="flex flex-col mt-16 w-2/5 mx-auto">
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">Guests</h3>
      <div className="text-center font-corsiva text-xl mb-8">
        Total guests: {user.wedding.guests.length}
      </div>
      <Table columns={columns} data={data} />
      <BigButton link href="/guest-new">
        New Guest
      </BigButton>
    </main>
  );
};

export default Guests;
