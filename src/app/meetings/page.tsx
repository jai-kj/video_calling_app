import MyMeetingsPage from "@/components/meeting/MyMeetingsPage";
import { APP_META } from "@/config/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: APP_META.MY_MEETINGS.TITLE,
  description: APP_META.MY_MEETINGS.DESCRIPTION,
};

const MeetingsPage = () => {
  return <MyMeetingsPage />;
};

export default MeetingsPage;
