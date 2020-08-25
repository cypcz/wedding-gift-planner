import Index from "@containers/Index";
import UserContext from "@utils/userContext";

const IndexPage = () => {
  return (
    <UserContext>
      <Index />
    </UserContext>
  );
};

export default IndexPage;
