import {
  HomePage,
  Institute,
  Center,
  ClassRoom,
  Teacher,
  Student,
  Lesson,
  Exercise,
  Archived,
} from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/institute",
    element: Institute,
  },
  {
    path: "/center",
    element: Center,
  },
  {
    path: "/classRoom",
    element: ClassRoom,
  },
  {
    path: "/teacher",
    element: Teacher,
  },
  {
    path: "/student",
    element: Student,
  },
  {
    path: "/lesson",
    element: Lesson,
  },
  {
    path: "/exercise",
    element: Exercise,
  },
  {
    path: "exercise/archived",
    element: Archived,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
