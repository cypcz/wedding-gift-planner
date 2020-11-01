import { GiftInfoFragment } from "@codegen/generated/graphql";
import BigButton from "@components/Buttons/BigButton";
import Copy from "@components/Icons/Copy";
import Table from "@components/Table";
import { Routes } from "@utils/constants";
import Link from "next/link";

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Link",
    accessor: "link",
  },
  {
    header: "Image",
    accessor: "image",
  },
];

interface Props {
  gifts?: GiftInfoFragment[];
}

const Gifts: React.FC<Props> = ({ gifts }) => {
  const tableData = gifts?.map((gift) => ({
    name: (
      <div className="flex flex-col">
        <Link href={Routes.GIFT.path.replace(":id", gift.id)}>{gift.name}</Link>
        <>
          {gift.contributions.map((contribution) => (
            <span key={contribution.id} className="text-xs pl-2">
              {`${contribution.contributor.firstName} ${contribution.contributor.lastName}`}
            </span>
          ))}
        </>
      </div>
    ),
    price: `${gift.price} ${gift.currency}`,
    link: gift.link ? (
      <div className="w-6">
        <a href={gift.link} target="_blank" rel="noopener noreferrer">
          <Copy />
        </a>
      </div>
    ) : (
      ""
    ),
    image: gift.imgUrl ? <img src={gift.imgUrl} className="max-w-2/3" /> : "",
  }));

  return (
    <>
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">Gifts</h3>
      <div>Total gifts: {gifts?.length}</div>
      <Table columns={columns} data={tableData} />
      <BigButton link href={Routes.GIFT_NEW.path}>
        New Gift
      </BigButton>
    </>
  );
};

export default Gifts;
