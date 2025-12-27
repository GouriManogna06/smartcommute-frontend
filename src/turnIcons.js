// turnIcons.js
// Returns appropriate icon based on OSRM maneuver type + modifier

const iconBase = "https://cdn-icons-png.flaticon.com/512";

// Main function
export default function getTurnIcon(type, modifier) {
  type = type?.toLowerCase() || "";
  modifier = modifier?.toLowerCase() || "";

  // Straight
  if (type === "new name" || type === "continue" || modifier === "straight") {
    return `${iconBase}/860/860790.png`; // ↑
  }

  // Turn Left
  if (modifier === "left") {
    return `${iconBase}/545/545682.png`; // ←
  }

  // Turn Right
  if (modifier === "right") {
    return `${iconBase}/545/545689.png`; // →
  }

  // Slight Left
  if (modifier === "slight left") {
    return `${iconBase}/271/271249.png`; // ↖
  }

  // Slight Right
  if (modifier === "slight right") {
    return `${iconBase}/271/271396.png`; // ↗
  }

  // Sharp Left
  if (modifier === "sharp left") {
    return `${iconBase}/271/271232.png`; // ⤒ left
  }

  // Sharp Right
  if (modifier === "sharp right") {
    return `${iconBase}/271/271491.png`; // ⤓ right
  }

  // U-Turn
  if (modifier === "uturn" || type === "uturn") {
    return `${iconBase}/545/545679.png`; // ⤵
  }

  // Roundabout
  if (type === "roundabout") {
    return `${iconBase}/252/252025.png`; // ⟳
  }

  // Merge Left
  if (modifier === "merge left") {
    return `${iconBase}/2985/2985118.png`; // merge left
  }

  // Merge Right
  if (modifier === "merge right") {
    return `${iconBase}/2985/2985391.png`; // merge right
  }

  // Keep Left
  if (modifier === "keep left") {
    return `${iconBase}/271/271222.png`; // ↙
  }

  // Keep Right
  if (modifier === "keep right") {
    return `${iconBase}/271/271405.png`; // ↘
  }

  // Default Straight Icon
  return `${iconBase}/860/860790.png`; // ↑
}
