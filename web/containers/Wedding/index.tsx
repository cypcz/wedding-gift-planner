import { WeddingInfoFragment } from "@codegen/generated/graphql";
import BigButton from "@components/BigButton";
import { useState } from "react";
import WeddingForm from "./form";

interface Props {
  wedding?: WeddingInfoFragment;
}

const Wedding: React.FC<Props> = ({ wedding }) => {
  const [showProfile, setShowProfile] = useState(false);

  return !wedding ? (
    <WeddingForm setShowProfile={setShowProfile} />
  ) : showProfile ? (
    <WeddingForm wedding={wedding} setShowProfile={setShowProfile} />
  ) : (
    <main className="flex flex-col mt-16 w-2/5 mx-auto">
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">
        {wedding.partner1Name} <div className="mx-8">&</div> {wedding.partner2Name}
      </h3>
      <div className="flex justify-between">
        <BigButton link href="/guests">
          Guests
        </BigButton>
        <BigButton link href="/gifts">
          Gifts
        </BigButton>
        <BigButton onClick={() => setShowProfile(true)}>Profile</BigButton>
      </div>
    </main>
  );
};

export default Wedding;
