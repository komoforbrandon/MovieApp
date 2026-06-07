import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col py-4 px-5 bg-black/70 shadow-sm">
      <section className="flex items-center space-y-5 flex-col md:flex-row md:justify-between border-b border-gray-800 pb-6">
        <div className="flex items-center  md:items-start flex-col space-y-2 text-red-200">
          <Link to="#">Audio and Subtitles</Link>
          <Link to="/watchlist">Media Center</Link>
          <Link to="#">Privacy</Link>
          <Link to="#">Contact Us</Link>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-2 text-red-200">
          <Link to="#">Audio Description</Link>
          <Link to="#">Investor Relations</Link>
          <Link to="#">Legal Notices</Link>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-2 text-red-200">
          <Link to="#">Help Center</Link>
          <Link to="#">Jobs</Link>
          <Link to="#">Cookie Preferences</Link>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-2 text-red-200">
          <Link to="#">Gift Cards</Link>
          <Link to="#">Termsof Use</Link>
          <Link to="#">Corporate Information</Link>
        </div>
      </section>
      <div className="text-red-200 py-3 md:py-5 font-bold uppercase">
        &copy;1997 - {new Date().getFullYear()} NetCineX, Inc.
      </div>
    </footer>
  );
}
