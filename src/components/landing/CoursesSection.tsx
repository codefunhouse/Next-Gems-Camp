import { Button } from "../ui/button";

function CoursesSection() {
  const renderFirstCard = () => (
    <div className="px-4 sm:px-10 py-5 sm:py-8 bg-[#FE7201] flex flex-col justify-between">
      <h2 className="text-white">2026 Summer Courses Now Open</h2>
      <Button>Apply Now</Button>
    </div>
  );

  const renderCourseCard = ({ className }: { className?: string }) => (
    <div></div>
  );
  return (
    <section className="px-8 sm:px-[4.8rem] bg-white py-10">
      {/* Upper section */}
      <div className=""></div>

      {/* Lower section */}
      <div></div>
    </section>
  );
}

export default CoursesSection;
