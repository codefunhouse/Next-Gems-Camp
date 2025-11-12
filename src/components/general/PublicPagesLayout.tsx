import Footer from "./Footer";
import Navbar from "./Navbar";

function PublicPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-36 sm:pt-[7.8rem]">
      <Navbar />
      <main className="min-h-screen flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default PublicPagesLayout;
