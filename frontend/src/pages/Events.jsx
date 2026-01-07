import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FadeIn } from "../components/Motion";
import { motion } from "framer-motion";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState("");
  const { user } = useAuth();

  const load = async () => {
    setErr("");
    try {
      const { data } = await api.get("/events");
      setEvents(data);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load events");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const rsvp = async (id) => {
    try {
      await api.post(`/events/${id}/rsvp`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || "RSVP failed");
    }
  };

  return (
    <FadeIn className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Events
            </h2>
            <p className="text-sm text-slate-500">
              Browse upcoming volunteer events and RSVP in one click.
            </p>
          </div>

          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              Logged in: {user?.email}
            </span>
          </div>
        </div>

        {/* Error */}
        {err && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {err}
          </div>
        )}

        {/* Events */}
        <div className="mt-8 grid gap-4">
          {events.map((ev) => {
            const attendees = ev.attendees?.length || 0;
            const dateObj = new Date(ev.date);
            const dateStr = dateObj.toLocaleString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={ev._id}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* top accent */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 opacity-70" />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-lg font-semibold text-slate-900">
                        {ev.title}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        Upcoming
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                        {attendees} attending
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">{dateStr}</p>

                    {ev.description && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        {ev.description}
                      </p>
                    )}

                    <p className="mt-4 text-xs text-slate-500">
                      Created by:{" "}
                      <span className="font-medium text-slate-700">
                        {ev.createdBy?.name || "Unknown"}
                      </span>
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.12 }}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                      onClick={() => rsvp(ev._id)}
                    >
                      RSVP
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {events.length === 0 && !err && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-900">No events yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Check back soon — new events will appear here.
            </p>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
