import BigButton from "@components/BigButton";

const Index = () => {
  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <BigButton link href="/dashboard">
          To the App!
        </BigButton>
      </main>
      <footer></footer>
    </>
  );
};

export default Index;
