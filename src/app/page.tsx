export default function Home() {
  return (
    <main className="min-h-screen">
      {/* slideshow section */}
      <div
        className="relative h-64 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: 'url("./assests/background.png")' }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to the Stablo
          </h1>
          <p className="text-lg md:text-xl text-center max-w-md">
            A brief and engaging description of your website's purpose and
            offerings.
          </p>
        </div>
      </div>

      {/* about section */}
    </main>
  );
}
