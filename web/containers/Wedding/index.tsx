import BigButton from "@components/BigButton";
import { UserContext } from "@utils/userContext";
import { useContext, useState } from "react";
import WeddingForm from "./form";

const Wedding = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useContext(UserContext);
  const wedding = user?.wedding;

  return !wedding ? (
    <WeddingForm />
  ) : showProfile ? (
    <WeddingForm />
  ) : (
    <main className="flex flex-col mt-16 w-2/5 mx-auto">
      <h3 className="flex font-corsiva justify-center mb-4 text-4xl">
        {wedding.partner1Name} <div className="mx-8">&</div> {wedding.partner2Name}
      </h3>
      <div className="flex justify-between">
        <BigButton>Guests</BigButton>
        <BigButton>Gifts</BigButton>
        <BigButton onClick={() => setShowProfile(true)}>Profile</BigButton>
      </div>
    </main>
  );
};

export default Wedding;
