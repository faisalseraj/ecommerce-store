import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProtectedPage = async () => {
  const session = (await getServerSession()) as any;

  if (!session) {
    redirect("/auth/signin"); // Redirect to sign in if not authenticated
  }

  return (
    <div>
      <h1>This is a protected page!</h1>
      <p>You must be logged in to see this.</p>
      <p>Welcome, {session.user.fullName}</p>
    </div>
  );
};

export default ProtectedPage;
