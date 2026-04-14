import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("lab", "routes/lab.tsx"),
  route("plants", "routes/plants.tsx"),
] satisfies RouteConfig;
