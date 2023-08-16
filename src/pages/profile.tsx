import AuthenticatedPage from "@/components/auth/AuthenticatedPage";

const profile = () => {
  return (
    <AuthenticatedPage>
      <div className="text-4xl mt-16">this is a authenticate page for user</div>
    </AuthenticatedPage>
  );
};

export default profile;
