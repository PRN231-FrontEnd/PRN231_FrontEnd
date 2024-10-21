import React from "react";
import "./footer.css";
function Footer() {
  return (
    <>
      <div className="footer-container">
        <footer className="text-center text-white">
          <div className="container">
            <section className="mt-5">
              <div className="row text-center d-flex justify-content-center pt-5">
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      About us
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Products
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Awards
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Help
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Contact
                    </a>
                  </h6>
                </div>
              </div>
            </section>

            <hr className="my-5" />

            <section className="mb-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <p>
                    FlowerExchange is a unique platform that allows users to
                    give new life to their event flowers by exchanging them with
                    others. Whether you're looking to share floral arrangements
                    from weddings, parties, or celebrations, FlowerExchange
                    makes it easy to pass on the beauty while reducing waste and
                    promoting sustainability.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center mb-5">
              <a href="" className="text-white me-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="bi bi-google"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="bi bi-github"></i>
              </a>
            </section>
          </div>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:
            <a className="text-white" href="#">
              FlowerExchange.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
