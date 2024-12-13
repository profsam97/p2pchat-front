import { LoginForm } from "@/components/auth/login-form";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <img src="/assets/img/chatLogo.png" width={135} height={51} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}