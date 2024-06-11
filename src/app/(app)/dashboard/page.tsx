import { UserDashboard } from "@/components/UserDashboard";
export const generateMetadata = async () => {
  return {
    title: "Dashboard - FeedbackGhost: Anonymous Feedback Platform",
    description:
      "Join FeedbackGhost, the leading platform for anonymous feedback. Speak your mind openly and foster honest communication without fear of judgment.",
  };
};
export default function Dashboard() {
  return <UserDashboard />;
}
