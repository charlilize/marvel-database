import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav style={{ position: "fixed", top: "0", right: "0", margin: "20px"}}>
        <ul>
          <li className="border-4 border-black border-solid rounded-lg" key="home-button">
            <Link className="text-black p-5 " to="/">
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
