import { APP_ROUTES } from "@/config/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button, { buttonClassNames } from "./Button";

const GoBack = () => {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      <Button
        onClick={router.back}
        className="bg-gray-500 hover:bg-gray-600 active:bg-gray-600"
      >
        Go Back
      </Button>
      <Link href={APP_ROUTES.BASE_ROUTE} className={buttonClassNames}>
        Go Home
      </Link>
    </div>
  );
};

export default GoBack;
