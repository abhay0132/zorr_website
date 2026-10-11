import { Play } from "./icons";

type Props = {
  /** Exercise name shown in the slot and used as the video's accessible label. */
  title: string;
  /** Optional. Without it the slot renders a placeholder and never implies a playable video. */
  videoUrl?: string;
  className?: string;
};

// A form-video slot. Pass videoUrl once a clip exists; until then it stays an honest placeholder.
export default function VideoSlot({ title, videoUrl, className = "" }: Props) {
  if (videoUrl) {
    return (
      <video
        className={`h-24 w-full rounded-xl bg-surface-3 object-cover ${className}`}
        src={videoUrl}
        controls
        playsInline
        preload="none"
        aria-label={`${title} form video`}
      />
    );
  }

  return (
    <div className={`flex h-24 items-center justify-center gap-2.5 rounded-xl border border-dashed border-control text-xs text-muted ${className}`}>
      <span aria-hidden="true" className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-accent text-on-accent">
        <Play />
      </span>
      <span>
        {title} <span className="font-mono text-[10px] uppercase tracking-label-tight text-dim">· video soon</span>
      </span>
    </div>
  );
}
