import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { DatePicker, Form, Input, Modal, Select, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import "../../assets/css/paymentModal.css";
import routes from "../../routes";
import { formatCurrency } from "../formatCurrency";
import moment from "moment";

const ServiceRequestModal = ({
  visible,
  onCancel,
  services = [],
  handleServiceRequest,
  serviceRequest,
  setServiceRequest,
}) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const history = useHistory();
  const mobile = useMobile();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onCancel();
    handleServiceRequest();
  };

  function handleChange(name, value) {
    console.log(`Name - ${name} - Value- ${value}`);
    if (name === "providerServiceIds") {
      setServiceRequest({ ...serviceRequest, providerServiceIds: value });
      /* let prvArr = [...serviceRequest?.providerServiceIds];
      if (prvArr?.includes(value)) {
        let filtered = prvArr.filter((i) => i !== value);
        setServiceRequest({
          ...serviceRequest,
          providerServiceIds: filtered,
        });
      } else {
        setServiceRequest({
          ...serviceRequest,
          providerServiceIds: [...serviceRequest?.providerServiceIds, value],
        });
      }*/
    } else {
      setServiceRequest({ ...serviceRequest, appointmentTime: value });
    }
  }

  return (
    <Modal
      centered
      visible={visible}
      onCancel={onCancel}
      width={mobile ? "100vw" : "60vw"}
      closable
      footer={null}
      closeIcon={
        <FontAwesomeIcon
          icon={icons.faTimesCircle}
          className="text-dark"
          size="lg"
        />
      }
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        paddingBottom: 0,
      }}
    >
      <div className="py-5 container-fluid paymentModal">
        <h4>Service Request</h4>
        <div className="row">
          <div className="col-md-12">
            <Form
              layout="vertical"
              scrollToFirstError
              onFinish={handleSubmit}
              form={form}
              // size="large"
            >
              <Form.Item
                className="mb-3 mb-md-0 mt-2"
                name="providerServiceIds"
                label="Provider Services"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
              >
                <Select
                  onChange={(value) =>
                    handleChange("providerServiceIds", value)
                  }
                  mode="multiple"
                  // allowClear
                >
                  {services?.map((item) => (
                    <Select.Option key={item?._id} value={item?._id}>{`${
                      item?.serviceCategoryName
                    } - $ ${formatCurrency(
                      item?.pricePerHour
                    )} /hour `}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className="mb-3 mb-md-0 mt-2"
                initialValue=""
                name="appointmentTime"
                label="Appointment Date"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
              >
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChange("appointmentTime", moment(date).utc().format())
                  }
                />
              </Form.Item>
              <br />
              <button className="btn btn-primary btn-block">Submit</button>
            </Form>
          </div>
        </div>
        {/* /.row */}
      </div>
    </Modal>
  );
};

export default ServiceRequestModal;
