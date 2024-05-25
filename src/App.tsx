import { BrowserRouter } from "react-router-dom";
import { useRef, useCallback } from "react";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Drawer from "./components/layout/Drawer";
import Router from "./router/router";

const App = (): JSX.Element => {
  const $hamburger = useRef<HTMLInputElement>(null);

  const closeOverlay = useCallback(() => {
    $hamburger?.current?.click();
  }, []);

  return (
    <BrowserRouter>
      <input type="checkbox" id="side-menu" className="drawer-toggle" ref={$hamburger} />
      <section className="drawer-content">
        <Nav />
        <section className="main pt-16">
          <Router />
        </section>
        <Footer />
      </section>
      <Drawer closeOverlay={closeOverlay} />
    </BrowserRouter>
  );
};

export default App;
