import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Button, { buttonClassNames } from "../layout/Button";

const GuestLoginScreen = () => {
  return (
    <div className="mx-auto w-fit space-y-3">
      <h1 className="text-center text-2xl font-bold">Join meeting</h1>
      <ClerkLoaded>
        <SignInButton>
          <Button className="w-44">Sign in</Button>
        </SignInButton>
        <Link
          href={"?guest=true"}
          className={cn(
            buttonClassNames,
            "w-44 bg-gray-400 hover:bg-gray-500 active:bg-gray-500",
          )}
        >
          Guest mode
        </Link>
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="mx-auto animate-spin" />
      </ClerkLoading>
    </div>
  );
};

export default GuestLoginScreen;
