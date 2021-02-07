import {
  Currency,
  GiftInfoFragment,
  GiftsDocument,
  GiftsQuery,
  useUpsertGiftMutation,
  WeddingInfoFragment,
} from "@codegen/generated/graphql";
import SubmitButton from "@components/Buttons/SubmitButton";
import Input from "@components/Inputs/Input";
import Select from "@components/Inputs/Select";
import TextArea from "@components/Inputs/TextArea";
import { errorToast, successToast } from "@components/Toast";
import { Routes } from "@utils/constants";
import { useFormik } from "formik";
import { NextRouter } from "next/router";
import { validationSchema } from "./helpers";

interface Props {
  gift?: GiftInfoFragment | null;
  wedding: WeddingInfoFragment;
  router: NextRouter;
}

const GiftForm: React.FC<Props> = ({ wedding, gift, router }) => {
  const [upsertGift, { loading }] = useUpsertGiftMutation();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: gift?.name || "",
      description: gift?.description || "",
      price: gift?.price || 0,
      currency: gift?.currency || Currency.Eur,
      link: gift?.link || "",
      imgUrl: gift?.imgUrl || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await upsertGift({
          variables: {
            input: {
              ...values,
              weddingId: wedding.id,
              id: gift?.id,
            },
          },
          update: (cache, { data }) => {
            let existingData;
            try {
              existingData = cache.readQuery({
                query: GiftsDocument,
              }) as GiftsQuery;
            } catch (e) {}
            if (existingData) {
              const updatedGifts = gift?.id
                ? existingData.gifts.map((gift) =>
                    gift.id === data?.upsertGift.id ? data.upsertGift : gift,
                  )
                : [...existingData.gifts, data?.upsertGift];
              cache.writeQuery({
                query: GiftsDocument,
                data: {
                  gifts: updatedGifts,
                },
              });
            }

            router.push(Routes.GIFTS.path);
          },
        });

        if (gift?.id) {
          successToast("Gift updated!");
        } else {
          successToast("Gift created!");
        }
      } catch (e) {
        errorToast("Oops! Something went wrong :(");
      }
    },
  });

  const disabled = !!gift?.contributions.length;

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Gift</h3>
      <Input
        name="name"
        label="Name"
        placeholder="Vacuum cleaner"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        errors={errors}
        touched={touched}
      />
      <TextArea
        name="description"
        label="Description"
        placeholder="We're going to use this lovely vacuum cleaner every day!"
        rows={4}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        errors={errors}
        touched={touched}
      />
      <div>
        <Input
          type="number"
          name="price"
          label="Price"
          placeholder="49.50"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
          errors={errors}
          touched={touched}
          disabled={disabled}
        />
        <Select
          name="currency"
          label="Currency"
          options={Object.values(Currency).map((key) => ({
            label: key,
            value: key,
          }))}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.currency}
          disabled={disabled}
        />
      </div>
      <Input
        name="link"
        label="Link"
        placeholder="https://shop.com/my-lovely-gift"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.link}
        errors={errors}
        touched={touched}
      />
      <Input
        name="imgUrl"
        label="Image"
        placeholder="https://shop.com/my-lovely-gift/image.png"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.imgUrl}
        errors={errors}
        touched={touched}
      />
      <SubmitButton type="submit" disabled={loading} />
    </form>
  );
};

export default GiftForm;
