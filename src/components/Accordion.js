import React from "react";
import { AccordionItem, AccordionWrapper } from "custom-react-accordion";
import "../assets/css/Accordion.css";
import "custom-react-accordion/dist/Accordion.css";

const Accordion = ({ allFaqs }) => {
  return (
    <AccordionWrapper>
      {allFaqs?.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.question}
          description={item.answer}
        />
      ))}
    </AccordionWrapper>
  );
};

export default Accordion;
