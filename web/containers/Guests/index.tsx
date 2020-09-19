import { GuestInfoFragment } from "@codegen/generated/graphql";
import BigButton from "@components/BigButton";
import Table from "@components/Table";
import Link from "next/link";
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

interface Props {
  guests?: GuestInfoFragment[];
}

const Guests: React.FC<Props> = ({ guests }) => {
  const tableData = guests?.map((guest) => ({
    // Warning should be fixed in 9.5.4..
    name: (
      <Link href={`/guest/${guest.id}`} /* prefetch={false} */>
        {`${guest.firstName} ${guest.lastName}`}
      </Link>
    ),
    status: guest.status,
    link: (
      <CopyToClipboard text={guest.guestLink} onCopy={() => console.log("copied")}>
        <span>Click to copy invitation link</span>
      </CopyToClipboard>
    ),
  }));

  return (
    <main className="flex flex-col mt-16 w-2/5 mx-auto">
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">Guests</h3>
      <div className="text-center font-corsiva text-xl mb-8">Total guests: {guests?.length}</div>
      <Table columns={columns} data={tableData} />
      <BigButton link href="/guest-new">
        New Guest
      </BigButton>
    </main>
  );
};

export default Guests;
