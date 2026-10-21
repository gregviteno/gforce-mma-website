/* =====================================================================
   G-FORCE CLASS SCHEDULE: edit this one file to update every page.
   ---------------------------------------------------------------------
   One line per class:
     { day: "Mon", start: "4:00 PM", end: "4:30 PM", program: "little-warriors" }
   day      Mon Tue Wed Thu Fri Sat Sun
   program  one of the ids in GF_PROGRAMS below
   note     optional, e.g. "No-Gi" or "Advanced"
   Delete a line to remove a class. Copy a line to add one.

   ⚠ SAMPLE TIMES: G-Force hasn't sent its real schedule yet.
   Set GF_SCHEDULE_IS_SAMPLE to false once these are real.
   ===================================================================== */
window.GF_SCHEDULE_IS_SAMPLE = true;

window.GF_SCHEDULE = [
  { day: "Mon", start: "4:00 PM", end: "4:30 PM", program: "little-warriors" },
  { day: "Mon", start: "4:45 PM", end: "5:30 PM", program: "kids-jiu-jitsu" },
  { day: "Mon", start: "6:30 PM", end: "7:30 PM", program: "jiu-jitsu" },
  { day: "Mon", start: "7:45 PM", end: "8:30 PM", program: "hiit" },
  { day: "Tue", start: "4:00 PM", end: "4:30 PM", program: "little-warriors" },
  { day: "Tue", start: "4:45 PM", end: "5:30 PM", program: "kids-kickboxing" },
  { day: "Tue", start: "6:00 PM", end: "7:30 PM", program: "girls-wrestling" },
  { day: "Tue", start: "7:30 PM", end: "8:30 PM", program: "kickboxing" },
  { day: "Wed", start: "9:30 AM", end: "10:15 AM", program: "hiit" },
  { day: "Wed", start: "4:45 PM", end: "5:30 PM", program: "kids-jiu-jitsu" },
  { day: "Wed", start: "6:30 PM", end: "7:30 PM", program: "jiu-jitsu" },
  { day: "Thu", start: "4:00 PM", end: "4:30 PM", program: "little-warriors" },
  { day: "Thu", start: "4:45 PM", end: "5:30 PM", program: "kids-kickboxing" },
  { day: "Thu", start: "6:00 PM", end: "7:30 PM", program: "girls-wrestling" },
  { day: "Thu", start: "7:30 PM", end: "8:30 PM", program: "kickboxing" },
  { day: "Fri", start: "4:45 PM", end: "5:30 PM", program: "kids-jiu-jitsu" },
  { day: "Fri", start: "6:30 PM", end: "7:30 PM", program: "jiu-jitsu", note: "Open mat" },
  { day: "Sat", start: "9:00 AM", end: "9:30 AM", program: "little-warriors" },
  { day: "Sat", start: "9:45 AM", end: "10:30 AM", program: "kids-jiu-jitsu" },
  { day: "Sat", start: "10:45 AM", end: "11:30 AM", program: "kids-kickboxing" },
  { day: "Sun", start: "9:00 AM", end: "9:45 AM", program: "hiit" },
  { day: "Sun", start: "10:00 AM", end: "11:00 AM", program: "jiu-jitsu" }
];

/* Program list: names, ages and pages. Edit ages here when G-Force confirms them. */
window.GF_PROGRAMS = {
  "little-warriors": { name: "Little Warriors",      ages: "Ages 3–5",              group: "kids",   page: "little-warriors.html" },
  "kids-jiu-jitsu":  { name: "Kids Jiu-Jitsu",       ages: "Kids (ages TBD)",       group: "kids",   page: "kids-jiu-jitsu.html" },
  "kids-kickboxing": { name: "Kids Kickboxing",      ages: "Kids (ages TBD)",       group: "kids",   page: "kids-kickboxing.html" },
  "girls-wrestling": { name: "Girls' Wrestling",     ages: "Middle & high school",  group: "kids",   page: "girls-wrestling.html" },
  "jiu-jitsu":       { name: "Brazilian Jiu-Jitsu",  ages: "Adults · all levels",   group: "adults", page: "jiu-jitsu.html" },
  "kickboxing":      { name: "Kickboxing",           ages: "Adults · all levels",   group: "adults", page: "kickboxing.html" },
  "hiit":            { name: "Express HIIT",         ages: "Adults · 45 minutes",   group: "adults", page: "hiit.html" }
};
