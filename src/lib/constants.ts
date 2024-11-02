import { Position } from "@capacitor/geolocation";

export const MAX_IMAGE_SIZE = 5000000; // 5MB
export const IMAGE_TYPES = ["image/png", "image/gif", "image/jpg"];
export const IMAGE_EXTENSIONS = IMAGE_TYPES.map((type) => type.split("/")[1]);
export const MAX_IMAGES = 10;

export const feedTypes = {
  all: "all",
  locations: "locations",
  events: "events",
  trips: "trips",
  posts: "posts",
  journals: "journals",
  equipments: "equipments",
  // campers are people who e.g are looking for
  // other people to go camping with
  campers: "campers",
} as const;

// offline default position
export const defaultPosition: Position = {
  coords: {
    latitude: 52.237049,
    longitude: 21.017532,
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
  timestamp: 0,
};
