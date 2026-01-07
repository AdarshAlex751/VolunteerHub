import { Link } from "react-router-dom";
import { FadeIn } from "../components/Motion";

export default function Home() {
  return (
    <FadeIn className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Volunteerhub(Reaching out for important events and announcements)
          </h1>

          <p className="mt-3 text-slate-600">
            Centralized platform for volunteer events, announcements, and participation tracking.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/events"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            >
              Go to Events
            </Link>

            <Link
              to="/announcements"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              View Announcements
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Events</p>
            <p className="mt-1 text-sm text-slate-600">
              Discover and RSVP for upcoming volunteer events.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Announcements</p>
            <p className="mt-1 text-sm text-slate-600">
              Stay updated with posts from admins.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Participation</p>
            <p className="mt-1 text-sm text-slate-600">
              Track your volunteer history in one place.
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
