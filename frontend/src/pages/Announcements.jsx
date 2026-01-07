import { useEffect, useState } from "react";
import api from "../services/api";
import { FadeIn } from "../components/Motion";
import { motion } from "framer-motion";

export default function Announcements() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const { data } = await api.get("/announcements");
      setPosts(data);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to load announcements");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <FadeIn className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Announcements
          </h2>
          <p className="text-sm text-slate-500">
            Updates and important info from the team.
          </p>
        </div>

        {/* Error */}
        {err && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {err}
          </div>
        )}

        {/* Posts */}
        <div className="mt-8 grid gap-4">
          {posts.map((p) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* top accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 opacity-70" />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-slate-900">
                    {p.title}
                  </h3>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {p.body}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                      Announcement
                    </span>
                    <span>
                      Posted by{" "}
                      <span className="font-medium text-slate-700">
                        {p.createdBy?.name || "Unknown"}
                      </span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span>{new Date(p.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && !err && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-900">
              No announcements yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              When new posts are made, they’ll show up here.
            </p>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
