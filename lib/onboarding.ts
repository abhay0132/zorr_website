// Web onboarding: the same questions and the same answer→profile mapping as the
// iPhone app (zorr_frontend/design-v2/onboarding + src/utils/transformOnboarding.ts),
// plus the web-only phone question. Option ids MUST stay identical to the app's:
// the backend enums and the injury tiers key off them.

export type Option = { id: string; title: string; description?: string };

export const SEX: Option[] = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

export const GOALS: Option[] = [
  { id: "fat", title: "Lose fat", description: "Lean down while keeping strength" },
  { id: "muscle", title: "Build muscle", description: "Add size and visible definition" },
  { id: "recomp", title: "Body recomposition", description: "Drop fat and build muscle at once" },
  { id: "endurance", title: "Improve endurance", description: "Stamina, conditioning, wind" },
  { id: "general", title: "General fitness", description: "Feel good, move well, stay healthy" },
];

export const EXPERIENCE: Option[] = [
  { id: "never", title: "Never trained", description: "Brand new to this" },
  { id: "beginner", title: "Beginner", description: "Under 6 months in" },
  { id: "intermediate", title: "Intermediate", description: "6 months to 2 years" },
  { id: "advanced", title: "Advanced", description: "2+ years consistent" },
];

/** ids are the backend TrainingRecency enum. */
export const RECENCY: Option[] = [
  { id: "never", title: "Never, really", description: "This is my starting point" },
  { id: "lt_1mo", title: "I train now", description: "Trained in the last month" },
  { id: "mo_1_3", title: "1 to 3 months off", description: "Short break from training" },
  { id: "mo_3_12", title: "3 to 12 months off", description: "It's been a while" },
  { id: "mo_12_plus", title: "Over a year off", description: "Coming back after a long gap" },
];

export const CONFIDENCE: Option[] = [
  { id: "low", title: "Not very", description: "New or unsure on form" },
  { id: "moderate", title: "Fairly confident", description: "Know most of the basics" },
  { id: "high", title: "Very confident", description: "Comfortable with the movements" },
];

export const ACTIVITY: Option[] = [
  { id: "sedentary", title: "Sedentary", description: "Desk job, little movement" },
  { id: "light", title: "Lightly active", description: "On your feet sometimes" },
  { id: "moderate", title: "Moderately active", description: "Active most days" },
  { id: "very", title: "Very active", description: "Physical job or always moving" },
];

export const LOCATIONS: Option[] = [
  { id: "home", title: "At home", description: "Train with what you've got" },
  { id: "gym", title: "At a gym", description: "Full equipment available" },
  { id: "both", title: "A bit of both", description: "Home some days, gym others" },
];

/** Labels must match the backend's equipment label map (utils/equipment.ts). */
export const EQUIPMENT = ["Dumbbells", "Barbell", "Resistance bands", "Pull-up bar", "Kettlebell", "Bench", "Bodyweight only"];

export const DAYS = [2, 3, 4, 5, 6];
export const LENGTHS = [30, 45, 60, 90];

export const NO_ISSUES = "No issues";
export const INJURY_AREAS = ["Neck", "Shoulders", "Elbows", "Wrists", "Lower back", "Hips", "Knees", "Ankles"];
/** ids are the backend INJURY_RECENCY_VALUES; this answer picks the injury strictness tier. */
export const INJURY_RECENCY: Option[] = [
  { id: "recent", title: "Recently", description: "Within the last few months, or still bothering me" },
  { id: "a_while_ago", title: "A while ago", description: "Healed up, but I still work around it" },
  { id: "recovered", title: "Fully recovered", description: "No longer affects my training" },
];

export const OUTSIDE = ["Running", "Walking", "Cycling", "Swimming", "Yoga", "Pilates", "Sports (team)", "Martial arts", "Rock climbing"];

export const SLEEP_DURATION = ["< 5h", "5–6h", "6–7h", "7–8h", "8h +"];
export const SLEEP_QUALITY: Option[] = [
  { id: "poor", title: "Restless" },
  { id: "ok", title: "Okay" },
  { id: "great", title: "Great" },
];

export const STRESS: Option[] = [
  { id: "low", title: "Low", description: "Calm and steady lately" },
  { id: "medium", title: "Medium", description: "Some pressure, manageable" },
  { id: "high", title: "High", description: "Stretched thin right now" },
];

export const DIETS: Option[] = [
  { id: "norestriction", title: "No restriction", description: "I eat a bit of everything" },
  { id: "veg", title: "Vegetarian", description: "No meat or fish" },
  { id: "eggetarian", title: "Eggetarian", description: "Vegetarian, plus eggs" },
  { id: "vegan", title: "Vegan", description: "No animal products" },
  { id: "nonveg", title: "Non-vegetarian", description: "Meat and fish included" },
];
export const ALLERGIES = ["Dairy", "Nuts", "Gluten", "Soy", "Shellfish", "Eggs"];

/** Web only. Values are the backend PhonePlatform enum. */
export const PHONES: Option[] = [
  { id: "IOS", title: "iPhone", description: "You'll be first on the invite list" },
  { id: "ANDROID", title: "Android", description: "Tells us how many of you there are" },
  { id: "OTHER", title: "Something else", description: "Or no phone in particular" },
];

export type Answers = {
  age: string;
  sex?: string;
  heightCm: string;
  weightKg: string;
  goal?: string;
  experience?: string;
  trainingRecency?: string;
  movementConfidence?: string;
  activity?: string;
  location?: string;
  equipment: string[];
  joiningGym?: boolean;
  daysPerWeek?: number;
  sessionLength?: number;
  injuries: string[];
  injuryRecency?: string;
  injuryNote: string;
  outsideActivities: string[];
  sleepDuration?: string;
  sleepQuality?: string;
  stress?: string;
  diet?: string;
  allergies: string[];
  phonePlatform?: string;
};

export const emptyAnswers: Answers = {
  age: "",
  heightCm: "",
  weightKg: "",
  equipment: [],
  injuries: [],
  injuryNote: "",
  outsideActivities: [],
  allergies: [],
};

// ─── Answer → profile (a port of the app's transformOnboarding) ────────────────

const GOAL_MAP: Record<string, string> = { fat: "lose_fat", muscle: "build_muscle", recomp: "stay_fit", endurance: "stay_fit", general: "stay_fit" };
const EXPERIENCE_MAP: Record<string, string> = { never: "beginner", beginner: "beginner", intermediate: "intermediate", advanced: "advanced" };
const SLEEP_MAP: Record<string, number> = { "< 5h": 4.5, "5–6h": 5.5, "6–7h": 6.5, "7–8h": 7.5, "8h +": 8.5 };
const DIET_MAP: Record<string, string[]> = { norestriction: [], veg: ["Vegetarian"], eggetarian: ["Eggetarian"], vegan: ["Vegan"], nonveg: ["Non-vegetarian"] };
const ACTIVITY_MAP: Record<string, string> = { sedentary: "Desk job", light: "Light activity", moderate: "Moderately active", very: "Very physical job" };
const GYM_EQUIPMENT = ["Barbell", "Bench", "Dumbbells", "Dumbbell"];

export function hasInjury(a: Answers): boolean {
  return a.injuries.some((i) => i !== NO_ISSUES);
}

/** Same rule as the app: any gym → full gym; home with gym-type kit → home gym; else bodyweight. */
function deriveEquipmentAccess(a: Answers): string {
  if (a.location === "gym" || a.location === "both" || a.joiningGym === true) return "full_gym";
  if (a.equipment.some((e) => GYM_EQUIPMENT.includes(e))) return "home_gym";
  return "bodyweight_only";
}

/** The body for PUT /api/user/profile. Undefined keys are dropped by JSON. */
export function toProfile(a: Answers): Record<string, unknown> {
  const notes: string[] = [];
  if (a.sleepQuality) notes.push(`Sleep quality: ${a.sleepQuality}`);
  if (a.allergies.length) notes.push(`Allergies: ${a.allergies.join(", ")}`);
  if (a.joiningGym) notes.push("Planning to join gym soon");

  return {
    age: a.age ? parseInt(a.age, 10) : undefined,
    gender: a.sex,
    height: a.heightCm ? parseInt(a.heightCm, 10) : undefined,
    currentWeight: a.weightKg ? parseFloat(a.weightKg) : undefined,
    primaryGoal: a.goal ? GOAL_MAP[a.goal] : undefined,
    fitnessLevel: a.experience ? EXPERIENCE_MAP[a.experience] : undefined,
    trainingRecency: a.trainingRecency,
    movementConfidence: a.movementConfidence,
    equipmentAccess: deriveEquipmentAccess(a),
    equipment: a.equipment.filter((e) => e !== "Bodyweight only"),
    daysPerWeek: a.daysPerWeek,
    sessionLength: a.sessionLength,
    sleepHours: a.sleepDuration ? SLEEP_MAP[a.sleepDuration] : undefined,
    stressLevel: a.stress ? a.stress.charAt(0).toUpperCase() + a.stress.slice(1) : undefined,
    dietStyle: a.diet ? DIET_MAP[a.diet] ?? [] : [],
    injuries: a.injuries.filter((i) => i !== NO_ISSUES),
    injuryDetails: a.injuryNote.trim() || undefined,
    // Only meaningful alongside a real injury.
    injuryRecency: hasInjury(a) ? a.injuryRecency : undefined,
    jobPhysicality: a.activity ? ACTIVITY_MAP[a.activity] : undefined,
    outsideActivities: a.outsideActivities,
    additionalNotes: notes.join(". ") || undefined,
    phonePlatform: a.phonePlatform,
  };
}

/** The user's local midnight today, sent as the plan start so plan weeks begin on day boundaries. */
export function localMidnightISO(now: Date = new Date()): string {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
}
