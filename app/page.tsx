import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // If the user is not authenticated, redirect them to the sign-in page
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>

        {session?.user ? (
          <>
            <p className="font-medium">{session.user.email}</p>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="User Avatar"
                className="mx-auto rounded-full"
                width={96}
                height={96}
                priority
                unoptimized
              />
            )}
          </>
        ) : (
          <p>Not signed in.</p>
        )}
      </div>

      <SignOut />
    </>
  );
}
