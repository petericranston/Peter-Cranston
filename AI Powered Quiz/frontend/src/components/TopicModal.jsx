import { useEffect } from "react";
import { TOPICS } from "../data/topics.jsx";
import { ArrowRight } from "../icons.jsx";

export default function TopicModal({
  topic,
  umbrellaTopic,
  hue,
  questions,
  loading,
  error,
  onStart,
  onClose,
  onRetry,
}) {
  // Use umbrella topic for icon; fall back to topic itself for custom searches
  const iconDef = TOPICS.find((t) => t.name === (umbrellaTopic ?? topic));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{ "--h": hue ?? 265 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Start ${topic} quiz`}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {iconDef && <div className="modal-icon">{iconDef.icon}</div>}

        <div className="modal-heading">
          {umbrellaTopic && (
            <span className="modal-eyebrow">{umbrellaTopic}</span>
          )}
          <h2 className="modal-title">{topic}</h2>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="modal-loading">
              <div className="modal-spinner" />
              <p className="modal-status">Crafting your quiz…</p>
            </div>
          )}

          {error && !loading && (
            <div className="modal-error-block">
              <p className="modal-error-text">
                Couldn't generate questions. Try again?
              </p>
              <button className="primary-btn" onClick={onRetry}>
                <span>Retry</span>
              </button>
            </div>
          )}

          {questions && !loading && (
            <div className="modal-ready">
              <p className="modal-ready-label">10 questions ready</p>
              <button className="primary-btn modal-start-btn" onClick={onStart}>
                <span>Start quiz</span>
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
