import { WeddingInfoFragment } from "@codegen/generated/graphql";
import BigButton from "@components/Buttons/BigButton";
import { Routes } from "@utils/constants";
import { useState } from "react";
import WeddingForm from "./form";

interface Props {
  wedding?: WeddingInfoFragment | null;
}

const Wedding: React.FC<Props> = ({ wedding }) => {
  const [showProfile, setShowProfile] = useState(false);

  return !wedding ? (
    <WeddingForm setShowProfile={setShowProfile} />
  ) : showProfile ? (
    <WeddingForm wedding={wedding} setShowProfile={setShowProfile} />
  ) : (
    <>
      <h3>
        {wedding.partner1Name} <div>&</div> {wedding.partner2Name}
      </h3>
      <div>
        <BigButton link href={Routes.GUESTS.path}>
          Guests
        </BigButton>
        <BigButton link href={Routes.GIFTS.path}>
          Gifts
        </BigButton>
        <BigButton onClick={() => setShowProfile(true)}>Profile</BigButton>
      </div>
    </>
  );
};

export default Wedding;
