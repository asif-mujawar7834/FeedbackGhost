import CarouselSection from "@/components/Carousel";
export const generateMetadata = async () => {
  return {
    title: "FeedbackGhost: Anonymously Share and Receive Honest Feedback",
    description:
      "Welcome to FeedbackGhost, your platform for anonymous feedback. Join our community to share your thoughts, ideas, and feedback anonymously, and empower honest communication without fear of judgment. Start meaningful conversations, drive positive change, and build trust within your community or workplace.",
  };
};
export default function Home() {
  return (
    <div className="container bg-white mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mt-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center">
          Share Your Thoughts Anonymously
        </h1>
        <p className="text-lg font-semibold sm:text-xl md:text-2xl text-center mt-5">
          Speak your mind without fear or hesitation. Our platform allows you to
          send anonymous feedback to anyone, anywhere.
        </p>
      </div>
      <div className="py-3">
        <CarouselSection />
      </div>
    </div>
  );
}
