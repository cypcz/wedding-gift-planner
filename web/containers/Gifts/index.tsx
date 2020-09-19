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
    name: <Link href={`/gift/${gift.id}`} /* prefetch={false} */>{gift.name}</Link>,
  }));

  return (
    <main className="flex flex-col mt-16 w-2/5 mx-auto">
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">Gifts</h3>
      <div className="text-center font-corsiva text-xl mb-8">Total gifts: {gifts?.length}</div>
      <Table columns={columns} data={tableData} />
      <BigButton link href="/gift-new">
        New Gift
      </BigButton>
    </main>
  );
};

export default Gifts;
