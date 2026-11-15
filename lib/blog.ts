// Blog posts, kept as plain data so the site needs no CMS or MDX. Each body is a list of
// blocks the post page renders. Copy follows the brief's rules (no em dashes, no banned
// words, present tense only for what is live on the web).
//
// TODO(founder): both launch posts were drafted from how the product actually behaves
// (onboarding, the equipment gate, the safety checks, weight guidance). Review before launch.

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  /** A line in Kai's voice, set apart with the orange K. */
  | { t: "kai"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** One line for the index and the meta description. */
  excerpt: string;
  tag: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  minutes: number;
  /** Which drawn cover the index and post header use: the two-week ring or a stack of plates. */
  cover: "ring" | "plates";
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "how-zorr-builds-your-two-weeks",
    title: "How Zorr builds your two weeks",
    excerpt: "You answer a few questions and wait about a minute. Here is what happens in that minute, and why each question is there.",
    tag: "How it works",
    date: "2026-11-15",
    minutes: 4,
    cover: "ring",
    body: [
      { t: "p", text: "You answer a few questions, wait about a minute, and get fourteen days of training. Here is what happens in that minute, and why each question is there." },
      { t: "h2", text: "The questions are the plan" },
      { t: "p", text: "Every answer changes something. Your goal shapes the sets and reps. How long you have trained, and how confident you are with the movements, decide how gentle the first weeks are. The number of days you can train sets how the week is split. Sleep, stress and how active you are outside training give it a picture of how much you are already carrying." },
      { t: "h2", text: "Only moves your kit allows" },
      { t: "p", text: "You tick the equipment you have. An exercise makes it into your plan only if everything it needs is on that list. Things almost every home has, like the floor, a wall, a chair or a towel, always count. Train in a full gym and the whole library is in play." },
      { t: "h2", text: "Worked around what hurts" },
      { t: "p", text: "Tell it what hurts. Anything that could aggravate it is left out of your plan. If something hurts during a session, stop. A plan is not a diagnosis, and pain that sticks around is one for a doctor or physiotherapist." },
      { t: "h2", text: "Checked before you see it" },
      { t: "p", text: "Software drafts the plan and our server checks it. Every starting load is checked against safety limits, and a day that comes back short of exercises is thrown out and built again instead of being padded with a template." },
      { t: "h2", text: "Weights by feel" },
      { t: "p", text: "Your plan does not guess a number for your first sets. A number worked out from a form can easily be wrong for you. Instead, every loaded exercise tells you to pick a weight you could lift two more times, which starts you where you actually are." },
      { t: "kai", text: "Pick a weight you could lift 2 more times." },
      { t: "h2", text: "Then you tick it off" },
      { t: "p", text: "Each day has a Mark day done button and a one-tap question: how did that feel? Easy, Right or Hard. Miss a day and the plan carries on." },
      { t: "ul", items: ["On the web you get your first two weeks, free.", "If the plan is not right, change your answers and rebuild it once.", "Swapping an exercise on the spot and weekly progression are coming to the iPhone app."] },
    ],
  },
  {
    slug: "picking-your-first-weights",
    title: "Your first weights: how to pick them when you have never lifted",
    excerpt: "The most common question from people starting out is how heavy it should be. The answer fits in one line, and this post unpacks it.",
    tag: "Training",
    date: "2026-11-15",
    minutes: 3,
    cover: "plates",
    body: [
      { t: "p", text: "The most common question from people starting out is how heavy it should be. Zorr's answer sits under every loaded exercise in your plan: pick a weight you could lift two more times." },
      { t: "h2", text: "What two more means" },
      { t: "p", text: "Do the set as written. On the last rep, ask yourself: could I have done two more with good form? If yes, you chose well. If you could have done five more, go up next time. If the last reps were a grind or your form slipped, go down." },
      { t: "p", text: "Coaches call this leaving reps in reserve. You work hard enough to improve without training to failure in your first week." },
      { t: "h2", text: "Start lighter than you want to" },
      { t: "p", text: "In your first sessions you are learning the movement as much as training the muscle. Stuck between two weights? Take the lighter one. One set tells you whether it was too easy, and you can move up on the next." },
      { t: "h2", text: "Form first, every time" },
      { t: "p", text: "Each exercise in your plan comes with short cues, like “drive through your heels” on a goblet squat. Read them before the first set. If a weight makes you break a cue, it is too heavy for now." },
      { t: "h2", text: "Bodyweight and holds" },
      { t: "p", text: "Not everything has a weight. Bodyweight moves say Bodyweight, and holds like a plank say Hold with good form, with a time to aim for. The same rule applies: stop before your form does." },
      { t: "h2", text: "When to stop" },
      { t: "ul", items: ["Effort and a bit of burn in the muscle are normal.", "Sharp pain, dizziness or chest discomfort are not. Stop and get checked.", "Zorr is not medical advice. Check with a doctor before starting if you have an injury or a condition."] },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00.000Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
