import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import OtherLinksContainer from "./OtherLinksContainer";
import image from "../../assets/images/others/mission.jpg";

const AboutPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <OtherLinksContainer>
        <div className="row">
          <div className="col-md-6 p-0 d-none d-md-block ">
            <img
              src={image}
              alt=""
              className="img-fluid h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h3 style={!mobile ? { marginTop: "10rem" } : null}>
              What we are all about.
            </h3>
            <p>
              Ac amet proin volutpat morbi. Leo rhoncus nisi pretium senectus
              arcu interdum nullam aliquam. Vitae consectetur curabitur dapibus
              in elit. Enim sit viverra varius sed nulla tempor. Amet, malesuada
              a ut rhoncus praesent quis euismod egestas. Commodo lectus quam
              nunc, aliquet aliquam vel at eleifend. Urna non pellentesque ipsum
              habitant. Donec sed urna arcu erat rhoncus facilisis ante
              parturient. Feugiat sed egestas molestie sodales condimentum.
              Eleifend ac nisl risus, enim. Phasellus sem eget interdum libero.
              Arcu eget lacinia gravida volutpat suscipit ipsum. Tortor nulla ac
              arcu maecenas massa id at id augue. Pellentesque nulla neque, sit
              magna iaculis. Porttitor quis ornare semper in in commodo
              pellentesque.
            </p>
            <br />
            <h3>Our Mission.</h3>
            <p>
              Ac amet proin volutpat morbi. Leo rhoncus nisi pretium senectus
              arcu interdum nullam aliquam. Vitae consectetur curabitur dapibus
              in elit. Enim sit viverra varius sed nulla tempor. Amet, malesuada
              a ut rhoncus praesent quis euismod egestas. Commodo lectus quam
              nunc, aliquet aliquam vel at eleifend. Urna non pellentesque ipsum
              habitant. Donec sed urna arcu erat rhoncus facilisis ante
              parturient. Feugiat sed egestas molestie sodales condimentum.
            </p>
          </div>
        </div>
        {/* /.row */}
      </OtherLinksContainer>
    </>
  );
};

export default AboutPage;
