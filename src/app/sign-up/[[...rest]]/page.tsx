import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="container mx-auto py-20">
      <div className="flex justify-center">
        <SignUp signInUrl="/sign-in" />
      </div>
    </div>
  );
};
export default SignUpPage;
