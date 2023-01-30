import {
  Routes,
  Route
} from "react-router-dom";
import { 
  Auth
} from "./layout/auth";
import UnAuth from "./layout/unAuth";
import { 
  routes, 
  NavItem 
} from './routes';

export default function App() {
  return (
      <Routes>
        <Route element={<UnAuth />}>
          { 
            routes
              .filter(({ layout }: NavItem) => layout === 'unAuth')
              .map((item: NavItem, index: number) => <Route key={index} path={item.path} element={item.component} />)
          }
        </Route>
        <Route element={<Auth />}>
          { 
            routes
              .filter(({ layout }: NavItem) => layout === 'auth')
              .map((item: NavItem, index: number) => <Route key={index} path={item.path} element={item.component} />)
          }
        </Route>
      </Routes>
  );
}
