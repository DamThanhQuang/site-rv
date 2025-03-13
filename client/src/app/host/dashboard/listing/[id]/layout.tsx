import ListingSetupPage from "./page";

const DetailsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ListingSetupPage />
      {/* <main>{children}</main> */}
    </div>
  );
};

export default DetailsLayout;
