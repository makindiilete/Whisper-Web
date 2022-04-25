import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import avatar from "../../assets/images/home/safe.jpg";
import moment from "moment";
import { Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import routes from "../../routes";
const { Item, Divider } = Menu;

const ServiceRequestsPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const menu = (
    <Menu>
      <Item key="0">
        <p className="padding-none">Make Payment</p>
      </Item>
      <Divider />
      <Item key="1">
        <p className="padding-none">Insert Code</p>
      </Item>{" "}
      <Divider />
      <Item key="2">
        <p className="padding-none">Chat</p>
      </Item>{" "}
      <Divider />
      <Item key="2">
        <p className="padding-none">See Details</p>
      </Item>
    </Menu>
  );
  return (
    <div className="container requests py-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h4>Service Requests</h4>
          <div
            className="card"
            style={{ borderRadius: "8px", border: "1px solid #31005c" }}
          >
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  className="mr-3"
                  src={avatar}
                  alt=""
                  style={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h5 className="mt-0">Provider Name</h5>
                  <p className="padding-none">This is my bio</p>
                  <p className="padding-none"> {moment().format("LL")} </p>
                </div>
              </div>
              <Dropdown overlay={menu} trigger={["click"]}>
                <button
                  className={`btn btn-primary mt-2 mt-md-0 ${
                    mobile && " btn-block"
                  }`}
                >
                  Actions
                  <FontAwesomeIcon
                    icon={icons.faChevronDown}
                    size="1x"
                    className="pl-2"
                  />
                </button>
              </Dropdown>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestsPage;
