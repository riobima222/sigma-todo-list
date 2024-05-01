import Auth from "@/components/authPage/auth";

export default function LoginPage() {
  return (
    <Auth
      title="Sigma Login"
      navigateText="register"
      navigate="/auth/register"
      isLogin={true}
      button="Login"
    />
  );
}
