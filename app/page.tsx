import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build 2 Learn
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Community where ideas transform into reality through collaborative learning
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <a
              href="/events"
              className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
            >
              Join Next Event
            </a>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              New to Coding?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join a team and learn by building real projects. Get hands-on experience with experienced developers.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Have an Idea?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Bring your app idea to life. Connect with developers who can help turn your vision into reality.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Experienced Developer?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Share your knowledge, mentor others, and build exciting micro apps in a collaborative environment.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Monthly Meetup",
                description: "We meet once a month to build micro apps together",
              },
              {
                title: "Form Teams",
                description: "Join existing projects or pitch your own idea",
              },
              {
                title: "Build Together",
                description: "Collaborate, learn, and create in a supportive environment",
              },
              {
                title: "Launch",
                description: "Present your work and celebrate achievements",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center space-x-6">
            <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              About
            </a>
            <a href="/events" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Events
            </a>
            <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
