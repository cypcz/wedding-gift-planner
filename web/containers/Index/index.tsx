import BigButton from "@components/Buttons/BigButton";
import { Routes } from "@utils/constants";

const Index = () => {
  return (
    <>
      <main>
        <BigButton link href={Routes.WEDDING.path}>
          To the App!
        </BigButton>
      </main>
      <footer></footer>
    </>
  );
};

export default Index;
