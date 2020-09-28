import {
  Currency,
  GiftInfoFragment,
  GiftsDocument,
  GiftsQuery,
  useUpsertGiftMutation,
  WeddingInfoFragment,
} from "@codegen/generated/graphql";
import Dot from "@components/Dot";
import Input from "@components/Input";
import { useFormik } from "formik";
import { NextRouter } from "next/router";

interface Props {
  gift?: GiftInfoFragment;
  wedding: WeddingInfoFragment;
  router: NextRouter;
}

const GiftForm: React.FC<Props> = ({ wedding, gift, router }) => {
  const [upsertGift] = useUpsertGiftMutation();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: gift?.name || "",
      description: gift?.description || "",
      price: gift?.price || 0,
      currency: gift?.currency || Currency.Eur,
      link: gift?.link || "",
      imgUrl: gift?.imgUrl || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await upsertGift({
        variables: {
          input: {
            ...values,
            weddingId: wedding.id,
            id: gift?.id,
          },
        },
        update: (cache, { data }) => {
          const existingData = cache.readQuery({
            query: GiftsDocument,
          }) as GiftsQuery;
          const updatedGifts = gift?.id
            ? existingData.gifts.map((gift) => {
                if (gift.id === data?.upsertGift.id) return data.upsertGift;
                return gift;
              })
            : [...existingData.gifts, data?.upsertGift];
          cache.writeQuery({
            query: GiftsDocument,
            data: {
              gifts: updatedGifts,
            },
          });

          router.push("/gifts");
        },
      });
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="font-corsiva text-center mb-4 text-2xl">New Gift</h3>
        <Input name="link" placeholder="Link" onChange={handleChange} value={values.link} />
        <Input name="name" placeholder="Name" onChange={handleChange} value={values.name} />
        <Input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={values.description}
        />
        <Input type="number" name="price" onChange={handleChange} value={values.price} />
        <Input name="currency" onChange={handleChange} value={values.currency} />
        <button className="flex flex-col items-center mx-auto focus:outline-none" type="submit">
          <span className="font-corsiva text-3xl">Proceed</span>
          <div className="flex">
            <Dot className="h-1 w-1" />
            <Dot className="h-1 w-1 mx-2" />
            <Dot className="h-1 w-1" />
          </div>
        </button>
      </form>
    </>
  );
};

export default GiftForm;
