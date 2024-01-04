import { Outlet, Link } from "react-router-dom";
import "./Home.scss"
// import Header from "../components/Header";
// import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="container">
      {/* <Header /> */}
      {/* <div className="">
        <Link className="page-button" to="/about-idea">
          იდეის შესახებ
        </Link>
      </div> */}
      <div className="">
        <Link className="page-button" to="/videos">
          ვიდეოები
        </Link>
      </div>
      <div className="">
        <Link className="page-button" to="/about-idea">
          იდეის შესახებ
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
