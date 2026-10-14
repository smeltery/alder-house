export const preparation = {
  location: {
    title: "Find your setting",
    headline: "Somewhere that feels like you.",
    description:
      "Choose the atmosphere you want. Explore a setting, its practical trade-offs, and what to discuss before choosing a specific place.",
    label: "What matters most about the setting?",
    action: "Find my setting",
    choices: [
      {
        label: "Familiar, private, and relaxed",
        result: "Start at home",
        location: "At home",
        tips: [
          "Look for a room with comfortable space and natural window light.",
          "Keep meaningful details; only tidy the areas you want photographed.",
          "Discuss who will be present and where everyone can take a break.",
          "Share a description of the space before deciding whether it fits your plans.",
        ],
      },
      {
        label: "Open space and room to move",
        result: "Try a park or garden",
        location: "In a park or garden",
        tips: [
          "Look for paths, open shade, and space to move without crowds.",
          "Check walking distances, parking, accessible routes, and restrooms.",
          "Confirm any photography permissions and seasonal restrictions.",
          "Plan an alternative for rain and allow flexibility around busy periods.",
        ],
      },
      {
        label: "Coastal scenery and an easygoing feel",
        result: "Consider the coast",
        location: "By the coast",
        tips: [
          "Choose an accessible stretch with room to walk and pause.",
          "Plan for wind, changing conditions, and comfortable footwear.",
          "Check local access rules and conditions before settling on a time.",
          "Discuss a sheltered alternative if the weather changes.",
        ],
      },
      {
        label: "A clean, simple backdrop",
        result: "Explore a studio",
        location: "In a studio",
        tips: [
          "Discuss the backdrop and lighting style you want before choosing a space.",
          "Confirm access, changing space, and room for everyone attending.",
          "Ask about rental time, costs, and any restrictions before committing.",
          "Bring a few meaningful objects if you want a personal detail in the images.",
        ],
      },
    ],
  },
  checklist: {
    title: "Get session-ready",
    headline: "A little preparation. More ease.",
    description:
      "Choose your session for a short checklist. Tick off what is ready, then bring your starting plan into an inquiry. Progress stays on this page only.",
    label: "What are you preparing for?",
    action: "Build my checklist",
    choices: [
      {
        label: "Portraits & milestones",
        result: "Your portrait checklist",
        session: "portraits",
        tips: [
          "Choose one outfit you feel comfortable moving and sitting in.",
          "Bring a backup layer and any meaningful milestone detail.",
          "Pick a few images that capture the feeling you want.",
          "Check the meeting point and leave time to arrive without rushing.",
        ],
      },
      {
        label: "Families & couples",
        result: "Your together-time checklist",
        session: "families",
        tips: [
          "Coordinate outfits with room for individual personality.",
          "Pack water, simple snacks, and a spare layer where useful.",
          "Choose a pace and time that suits everyone attending.",
          "Mention walking distances, breaks, and any practical access needs.",
        ],
      },
      {
        label: "Brands & makers",
        result: "Your brand-session checklist",
        session: "brands",
        tips: [
          "List the places you plan to use your photographs.",
          "Gather products, tools, and small details that tell your story.",
          "Prepare outfits and spaces that reflect your business.",
          "Prioritize the images you need most and discuss usage before booking.",
        ],
      },
      {
        label: "Gatherings & weddings",
        result: "Your celebration checklist",
        session: "celebrations",
        tips: [
          "Outline the key moments and approximate running order.",
          "List the people and group photographs that matter most.",
          "Confirm venue permissions, access, and a useful point of contact.",
          "Discuss weather alternatives and any quiet moments you want preserved.",
        ],
      },
    ],
  },
};
