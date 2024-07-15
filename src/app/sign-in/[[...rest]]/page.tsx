import { SignIn } from "@clerk/nextjs";

type SignPageProps = {
  searchParams: {
    redirectUrl: string;
  };
};

const SignInPage = ({ searchParams: { redirectUrl } }: SignPageProps) => {
  return (
    <div className="container mx-auto py-20">
      <div className="flex justify-center">
        <SignIn signUpUrl="/sign-up" forceRedirectUrl={redirectUrl} />
      </div>
    </div>
  );
};
export default SignInPage;
