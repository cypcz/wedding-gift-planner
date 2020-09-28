import { GiftInfoFragment } from "@codegen/generated/graphql";
import BigButton from "@components/BigButton";
import Table from "@components/Table";
import Link from "next/link";

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
];

interface Props {
  gifts?: GiftInfoFragment[];
}

const Gifts: React.FC<Props> = ({ gifts }) => {
  const tableData = gifts?.map((gift) => ({
    // Warning should be fixed in 9.5.4..
    name: <Link href={`/wedding/gifts/${gift.id}`} /* prefetch={false} */>{gift.name}</Link>,
  }));

  return (
    <>
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">Gifts</h3>
      <div className="text-center font-corsiva text-xl mb-8">Total gifts: {gifts?.length}</div>
      <Table columns={columns} data={tableData} />
      <BigButton link href="/gifts/new">
        New Gift
      </BigButton>
    </>
  );
};

export default Gifts;
