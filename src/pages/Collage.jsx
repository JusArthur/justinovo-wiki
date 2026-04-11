import Collage from "../components/Collage";

export default function CollagePage({ lang = "EN" }) {
  return (
    <main className="min-h-screen pt-24 pb-10 px-10 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-6xl relative z-10">
        {/* Call the component */}
        <Collage />

      </div>
    </main>
  );
}