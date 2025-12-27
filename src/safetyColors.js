// safetyColors.js
// Color codes for different hazard categories (used for markers + safety alert bar)

export default {
  stairs: "#E53935",               // Red
  steep: "#E53935",                // Red
  wheelchair_no: "#D81B60",        // Deep Pink (critical for disabled users)
  unpaved: "#FB8C00",              // Orange
  dark: "#6A1B9A",                 // Purple (night risk)
  uncontrolled_crossing: "#FDD835",// Yellow
  accident_hotspot: "#E65100",     // Deep orange
  crime_hotspot: "#B71C1C",        // Dark red
  dog_hotspot: "#2E7D32",          // Green (pet owner relevance)
  flood_zone: "#1E88E5",           // Blue (water-related risk)
  
  // fallback
  default: "#E53935"               // Red
};
