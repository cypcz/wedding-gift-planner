import { GuestInfoFragment } from "@codegen/generated/graphql";
import BigButton from "@components/Buttons/BigButton";
import Table from "@components/Table";
import { successToast } from "@components/Toast";
import { Routes } from "@utils/constants";
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
    name: (
      <Link href={Routes.GUEST.path.replace(":id", guest.id)}>
        {`${guest.firstName} ${guest.lastName}`}
      </Link>
    ),
    status: guest.status,
    link: (
      <CopyToClipboard
        text={`${location.origin}/invitation?id=${guest.id}`}
        onCopy={() => successToast("Link copied!")}
      >
        <span>Click to copy invitation link</span>
      </CopyToClipboard>
    ),
  }));

  return (
    <>
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">Guests</h3>
      <div className="text-center font-corsiva text-xl mb-8">Total guests: {guests?.length}</div>
      <Table columns={columns} data={tableData} />
      <BigButton link href={Routes.GUEST_NEW.path}>
        New Guest
      </BigButton>
    </>
  );
};

export default Guests;
