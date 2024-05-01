import Auth from "@/components/authPage/auth";

export default function LoginPage() {
  return (
    <Auth
      title="Sigma Register"
      navigateText="Login"
      navigate="/auth/login"
      isLogin={false}
      button="Register"
    />
  );
}
