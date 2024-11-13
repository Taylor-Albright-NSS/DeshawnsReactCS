import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { DogListView } from "./Components/DogListView";
import { DogDetailsView } from "./Components/DogDetailsView"
import { DogForm } from "./Components/DogForm";
import { WalkersView } from "./Components/WalkersView";
import { AddDogToWalkerView } from "./Components/AddDogToWalkerView";
import { AddCityView } from "./Components/AddCityView";
import { EditWalkerView } from "./Components/EditWalkerView";

function App() {
  return (
    <div className="App">
      <>
        <Navbar color="light" expand="md">
          <Nav navbar>
            <NavbarBrand href="/">🐕‍🦺 🐩</NavbarBrand>
            <NavItem>
              <NavLink href="/">Dogs</NavLink>
              <NavLink href="/walkers">Walkers</NavLink>
              <NavLink href="/addcity">Cities</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Outlet />
        <Routes>
          <Route index element={<DogListView />} />
          <Route path={`/:id`} element={<DogDetailsView />} />
          <Route path="/dogform" element={<DogForm />} />
          <Route path="/walkers" element={<WalkersView />} />
          <Route path="/addcity" element={<AddCityView />} />
          <Route path="/editwalker/:id" element={<EditWalkerView />} />
          <Route path="/adddogtowalker/:id" element={<AddDogToWalkerView />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
