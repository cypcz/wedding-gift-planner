import Link from "next/link";

const Index = () => {
  return (
    <>
      <main>
        <Link href="/auth">
          <a>Login</a>
        </Link>
      </main>
      <footer></footer>
    </>
  );
};

export default Index;
