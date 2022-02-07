import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import OtherLinksContainer from "./OtherLinksContainer";
import image from "../../assets/images/others/terms.png";

const TermsPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <OtherLinksContainer>
      <div
        className="position-relative"
        style={{
          marginTop: "-4rem",
          width: "100%",
          height: "27.6rem",
          backgroundColor: "#F9F2FF",
        }}
      >
        <img
          src={image}
          style={{
            width: "21.7rem",
            height: "19.2rem",
            objectFit: "cover",
            position: "absolute",
            right: mobile ? "5rem" : "15rem",
            bottom: "-9rem",
          }}
          alt=""
          className="img-fluid"
        />
        <div className="position-absolute" style={{ top: "0" }}>
          <div
            className="w-100 d-flex align-items-center"
            style={{ height: "27.6rem" }}
          >
            <div style={!mobile ? { marginLeft: "19rem" } : null}>
              <h3 className="text-center text-md-left ">Terms & Conditions</h3>
              {!mobile ? (
                <p className="text-center text-md-left ">
                  Ac amet proin volutpat morbi. Leo rhoncus nisi <br /> pretium
                  senectus arcu interdum nullam aliquam
                </p>
              ) : (
                <p className="text-center text-md-left ">
                  Ac amet proin volutpat morbi. Leo rhoncus nisi pretium
                  senectus arcu interdum nullam aliquam
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div
        className="container"
        style={!mobile ? { padding: "0 12rem" } : { marginTop: "5rem" }}
      >
        <h4>Introduction</h4>
        <p>
          Ac enim in fames interdum nulla diam. Facilisis diam ullamcorper
          aliquam felis. Proin sit arcu libero vitae eu vehicula morbi
          imperdiet. Vulputate tristique metus lacinia viverra turpis sed ipsum
          dui. Vitae fusce diam orci duis. Non a in placerat eu. Egestas in
          sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus
          tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi
          phasellus nibh. Suspendisse pulvinar molestie scelerisque nisl nulla.
          Nec venenatis, ultrices ipsum nulla cursus gravida erat convallis.
          Erat vehicula faucibus enim, turpis faucibus ultrices diam odio dolor.
          Justo sit eu posuere ut enim elit placerat dapibus convallis. Nec at
          facilisis morbi in. Sit mattis nunc tellus non sed. Viverra euismod
          pharetra velit viverra faucibus eget at in. At fringilla lacus laoreet
          a aliquet. Sit ultricies vitae tortor quis maecenas nisl.
        </p>
        <br />
        <h4>Overview</h4>
        <p>
          Ac enim in fames interdum nulla diam. Facilisis diam ullamcorper
          aliquam felis. Proin sit arcu libero vitae eu vehicula morbi
          imperdiet. Vulputate tristique metus lacinia viverra turpis sed ipsum
          dui. Vitae fusce diam orci duis. Non a in placerat eu. Egestas in
          sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus
          tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi
          phasellus nibh. Suspendisse pulvinar molestie scelerisque nisl nulla.
          Nec venenatis, ultrices ipsum nulla.
        </p>
        <br />
        <h4>Terms</h4>
        <p>
          Ac enim in fames interdum nulla diam. Facilisis diam ullamcorper
          aliquam felis. Proin sit arcu libero vitae eu vehicula morbi
          imperdiet. Vulputate tristique metus lacinia viverra turpis sed ipsum
          dui. Vitae fusce diam orci duis. Non a in placerat eu. Egestas in
          sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus
          tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi
          phasellus nibh. Suspendisse pulvinar molestie scelerisque nisl nulla.
          Nec venenatis, ultrices ipsum nulla cursus gravida erat convallis.
          Erat vehicula faucibus enim, turpis faucibus ultrices diam odio dolor.
          Justo sit eu posuere ut enim elit placerat dapibus convallis. Nec at
          facilisis morbi in. Sit mattis nunc tellus non sed. Viverra euismod
          pharetra velit viverra faucibus eget at in. At fringilla lacus laoreet
          a aliquet. Sit ultricies vitae tortor quis maecenas nisl. Odio non
          aliquam elit ultrices vitae risus egestas. Gravida nisi, erat
          tristique vulputate dictumst ornare vivamus ipsum at. Sit viverra
          morbi fames mauris, ipsum nunc mollis viverra. Dui sagittis, quis
          dignissim fringilla volutpat faucibus fringilla libero. Fermentum
          volutpat vitae dignissim sit accumsan nulla. Sit mauris sit egestas
          aliquam nibh suspendisse gravida at facilisi. Nulla aliquet
          scelerisque et adipiscing. In non euismod lectus molestie tortor.
          Molestie vitae scelerisque enim vulputate. Ultrices feugiat id pretium
          augue volutpat. In lectus urna nibh lobortis non. Enim nec integer
          turpis feugiat. Risus quis dictum enim sit egestas nulla lectus. Amet
          interdum semper risus lacus volutpat, ornare et. Et nullam suspendisse
          ultricies imperdiet mauris. Ligula diam nibh at et neque aenean. Velit
          duis dapibus sit varius massa enim sit. Sagittis, egestas morbi
          integer elementum. Imperdiet dictum in lobortis etiam vestibulum
          integer vitae ullamcorper lobortis. Lectus mattis lectus vel pharetra
          elementum euismod. Vitae, pharetra pellentesque a, nunc, sed vitae,
          morbi. Faucibus dui massa fermentum habitant tristique sagittis nunc
          at magna. Nunc orci pretium, ultrices amet accumsan rhoncus adipiscing
          sit. Amet blandit nisi, habitant netus. Phasellus sit venenatis
          lacinia pellentesque senectus nec duis. Posuere sed in egestas
          convallis curabitur feugiat etiam nisl. Eget nunc donec nunc mus.
          Arcu, proin dui ullamcorper vitae. Bibendum adipiscing amet,
          venenatis, tempor. Eget ac, sit ut nibh pulvinar. Ac enim, praesent
          odio tellus nisl. Morbi eget integer nascetur augue vitae, hendrerit
          bibendum mi fringilla. Massa varius est et, pellentesque. Elit tellus
          enim, justo nisi tristique enim, habitant sollicitudin. Fermentum, et
          faucibus eget donec. Sed in ultrices velit aliquet id facilisi semper.
          Libero sed magna ridiculus ultricies a viverra. Turpis dolor velit,
          pretium arcu. Duis fermentum mauris pellentesque faucibus et augue
          pretium tellus sapien. Justo, arcu turpis tincidunt amet posuere
          tortor sagittis arcu turpis. Sit ut diam id viverra pharetra. Molestie
          vestibulum vivamus augue at porttitor lobortis. Tincidunt proin varius
          odio tincidunt blandit bibendum gravida sed consectetur. Et etiam
          porttitor nibh nulla. Odio commodo eu proin in netus. Euismod nulla
          mauris purus morbi porttitor. Ac ultricies quis gravida diam tortor
          lacus ullamcorper eu. Maecenas in quis purus tellus suscipit. Ultrices
          vestibulum tincidunt molestie fermentum aliquet tellus ut mauris est.
          Tortor non ipsum dui nunc lectus ac arcu leo. Eget ultricies pharetra
          laoreet sed morbi eget.
        </p>
        <br />
      </div>
    </OtherLinksContainer>
  );
};

export default TermsPage;
