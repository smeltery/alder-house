import { sessions } from "./demo";
const details = [
  {
    image: "portrait",
    headline: "A fresh chapter. A familiar face.",
    audience:
      "For graduates, creatives, and anyone ready for a portrait that feels current, confident, and entirely their own.",
    timing: "Plan for 60–90 minutes",
    wardrobe:
      "Bring two favorite looks: one everyday outfit and one more polished option. Solid colors, subtle stripes, and well-fitting layers photograph beautifully.",
    location:
      "Choose a quiet street, a garden, or a simple indoor setting. The right location supports your personality without competing with it.",
    included: [
      "A conversation about your milestone and intended use",
      "Wardrobe and location planning",
      "Gentle posing guidance and time to settle in",
      "A considered selection of edited portraits",
    ],
    question: "Do I need to know how to pose?",
    answer:
      "Not at all. We would begin with simple movement and conversation, then offer small adjustments. You do not need a collection of practiced expressions.",
  },
  {
    image: "family",
    headline: "Your people. Just as they are.",
    audience:
      "For families of every shape, couples celebrating a chapter, and people who want their everyday connection remembered.",
    timing: "Plan for 45–75 minutes",
    wardrobe:
      "Coordinate a small palette rather than matching everything. Cotton, linen, knits, and comfortable shoes keep the focus on people. Bring a spare outfit for little ones.",
    location:
      "A familiar park, your home, or a quiet stretch of shoreline. Choose somewhere with room to move and a comfortable place for a break.",
    included: [
      "Planning around your family’s rhythms",
      "A mix of togetherness, individual portraits, and candid moments",
      "Space for snacks, breaks, and shy beginnings",
      "A thoughtfully edited family collection",
    ],
    question: "What if the children need a break?",
    answer:
      "Then we take one. A short walk, a snack, or a moment with a parent is part of a relaxed session, not an interruption to it.",
  },
  {
    image: "brand",
    headline: "The person behind the work.",
    audience:
      "For independent businesses, consultants, and makers who want a cohesive library of images for their website, social profiles, and next launch.",
    timing: "Plan for 90 minutes–3 hours",
    wardrobe:
      "Choose outfits that fit how you meet your clients. Bring useful tools, products, or materials from your work, and avoid props that do not belong in your everyday story.",
    location:
      "Your workspace, a clean studio setting, or a location connected to your business. Discuss permissions and natural light before the session.",
    included: [
      "A creative brief and list of intended channels",
      "A focused shot list with portrait and detail options",
      "Horizontal and vertical compositions for different uses",
      "A discussion of editing, usage rights, and delivery needs",
    ],
    question: "Can the images work across my website and social channels?",
    answer:
      "That is part of the plan. Share your layouts, crop requirements, and launch date so the shot list can include space for text and the formats you actually need.",
  },
  {
    image: "couple",
    headline: "A gathering worth remembering.",
    audience:
      "For intimate weddings, anniversaries, and celebrations where the people matter more than the production.",
    timing: "Coverage planned around your timeline",
    wardrobe:
      "Wear what makes the occasion feel like yours. Share meaningful details, family traditions, and any group photographs that are especially important.",
    location:
      "A garden, a family home, or a small venue. Talk through access, ceremony restrictions, weather alternatives, and the moments you want covered.",
    included: [
      "A timeline conversation and priority moments",
      "A concise list of important people and group photographs",
      "A balance of atmosphere, details, and candid coverage",
      "A complete discussion of coverage and delivery before booking",
    ],
    question:
      "Can you cover a small celebration rather than a whole wedding day?",
    answer:
      "Yes, that is the intention of this sample offering. Coverage would be scoped around the ceremony, gathering, or part of the day that matters to you.",
  },
];
export const sessionDetails = sessions.map((session, index) => ({
  ...session,
  ...details[index],
}));
