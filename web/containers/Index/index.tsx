import BigButton from "@components/Buttons/BigButton";
import { Routes } from "@utils/constants";

const Index = () => {
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <BigButton link href={Routes.WEDDING.path}>
          To the App!
        </BigButton>
      </main>
      <footer></footer>
    </>
  );
};

export default Index;
