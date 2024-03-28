import { APP_ROUTES } from "@/config/constants";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="shadow">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between p-3 font-medium">
        <Link href={APP_ROUTES.BASE_ROUTE}>New Meeting</Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <Link href={APP_ROUTES.MEETINGS}>Meetings</Link>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Navbar;
