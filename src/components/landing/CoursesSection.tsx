import { Button } from "../ui/button";

function CoursesSection() {
  const renderFirstCard = () => (
    <div className="px-4 sm:px-10 py-5 sm:py-8 bg-[#FE7201] flex flex-col justify-between">
      <h2 className="text-white">2026 Summer Courses Now Open</h2>
      <Button>Apply Now</Button>
    </div>
  );

  const renderCourseCard = ({ className }: { className?: string }) => (
    <div className="flex flex-col">
      <img src="" alt="" width={387} height={258} />
    </div>
  );
  return (
    <section className="px-8 sm:px-[4.8rem] bg-white py-10">
      {/* Upper section */}
      <div className="">
        <div className=""></div>
      </div>

      {/* Lower section */}
      <div className="flex flex-col items-center text-center gap-12">
        <h1 className="!font-normal">
          Unsure about which summer course to study?
        </h1>
        <p
          className="!text-lg sm:!text-2xl mt-4
        "
        >
          Take our quiz to get summer course recommendations based on your
          interests and passions.
        </p>
        <button className="bg-[#C04D00] shrink-0 w-full max-w-[140px] rounded-full py-3 px-1.5 text-white font-medium">
          START QUIZ
        </button>
      </div>
    </section>
  );
}

export default CoursesSection;
