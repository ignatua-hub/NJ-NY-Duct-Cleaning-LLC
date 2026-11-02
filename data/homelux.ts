// TODO: verify review count and date, and confirm written permission from HomeLux before publishing.

export type HomeLuxReview = {
  id: string;
  author: string;
  date: string;
  label: string;
  service: string;
  details: string;
  text: string;
  clampPreview: boolean;
  photos: string[];
};

export const homeluxProfile = {
  sectionTitleBefore: "Proud to Work with ",
  sectionTitleAccent: "HomeLux",
  subtitle:
    "Hands-on field experience: our team member works full-time at HomeLux, LLC, a duct and vent cleaning company in New Jersey.",
  sourceLine: "Reviews of HomeLux, LLC on Thumbtack",
  marketplaceName: "Thumbtack",
  companyName: "HomeLux, LLC",
  rating: 5,
  reviewsCount: "94",
  asOf: "as of November 2026",
  profileUrl:
    "https://www.thumbtack.com/nj/morganville/duct-cleaning/homelux-llc/service/540507037108412420?utm_medium=web&utm_source=txt&surface=sp",
  ctaLabel: "Read all reviews on Thumbtack",
  permissionNote:
    "Reviews shown are from the Thumbtack profile of HomeLux, LLC, shared with permission.",
};

export const homeluxReviews: HomeLuxReview[] = [
  {
    id: "review-1",
    author: "Rachel N.",
    date: "Aug 22, 2026",
    label: "Hired on Thumbtack",
    service: "Duct and Vent Cleaning",
    details:
      "House · Two-story building · 3,000 - 4,000 sq ft · Heating and cooling · Dryer · Exhaust (bathroom or kitchen) · 11 - 20 vents",
    text: "Mark and Vlad were amazing. They cleaned out all the ducts in my family home with such detail and accuracy. The before and after pics they shared told me all I needed to know. The most important was when Vlad cleaned out my dryer vent. It was so clogged that it was close to a possible house fire. See the pics. Crazy. Not only did he clean out the dryer vent, but when he looked behind, he noticed the tube wasn't even fully attached to the dryer and it was an old metal tubing. He immediately went to the truck and replaced it and did such an amazing job. to me that was above and beyond. I didn't ask he just did it. I very highly recommend these guys they're professional they're kind and they care. Their prices are also very, very fair.",
    clampPreview: true,
    photos: [
      "/images/homelux/review-1-a.jpg",
      "/images/homelux/review-1-b.jpg",
    ],
  },
  {
    id: "review-2",
    author: "Satinder S.",
    date: "May 30, 2026",
    label: "Hired on Thumbtack",
    service: "Duct and Vent Repair",
    details:
      "Exhaust (bathroom / kitchen) · Two-story building · Commercial · Owner",
    text: "These guys are the best. Vlad & and Team came to fix vent. They went above and beyond and found a nest inside the vet. They have done an amazing job.",
    clampPreview: false,
    photos: ["/images/homelux/review-2-a.jpg"],
  },
  {
    id: "review-3",
    author: "Culture C.",
    date: "Jul 13, 2026",
    label: "Hired on Thumbtack",
    service: "Duct and Vent Repair",
    details:
      "Not enough airflow / Blocked vents · Dryer · Flexible non-metallic material · Single-level building · House · Owner",
    text: "Both Mark and Vlad are amazing guys. Highly friendly human being and hard-workers. They did my dryer duct and Air Vents cleaning.Good Job done on time with fair pricing.",
    clampPreview: false,
    photos: [],
  },
];
