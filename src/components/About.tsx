export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-8">
        About Watch Next
      </h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <section>
          <h3 className="text-2xl font-bold text-white mb-3">What is this app?</h3>
          <p>
            Watch Next is your ultimate companion for discovering your next binge-worthy TV show.
            Whether you are scrolling endlessly trying to find something to watch, or you just want
            the universe to pick a Random Show for you, this app is designed to eliminate
            decision fatigue and get you straight to the entertainment.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-white mb-3">Data & API</h3>
          <p>
            All the show data, genres, images, and ratings are provided by the amazing community over at{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 underline decoration-red-500/30 underline-offset-4 transition-colors font-semibold"
            >
              The Movie Database (TMDB)
            </a>.
            We utilize their lightning-fast API to fetch real-time trending data and catalog searches.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-white mb-3">Streaming Availability</h3>
          <p>
            Currently, our random picker and explore galleries are strictly filtered to only show you titles
            available on <strong>Netflix USA</strong>. No more picking a show only to find out you need
            another subscription!
          </p>
          <p className="mt-4">
            <em>However</em>, please note that the powerful <strong>Search function</strong> (in the navigation bar)
            acts as a global catalog search, allowing you to search for shows across <strong>all streaming services</strong>.
          </p>
        </section>

        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mt-12">
          <h3 className="text-xl font-bold text-white mb-2">Future Plans</h3>
          <p className="text-zinc-400 text-base">
            We are actively working on expanding our features! In the future, we plan to allow you to
            select and toggle between other major streaming services like Hulu, Max, Prime Video, and
            Disney+, as well as introducing personalized watchlists.
          </p>
        </section>
      </div>
    </div>
  );
}
