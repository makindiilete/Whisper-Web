import React from "react";
import { AccordionItem, AccordionWrapper } from "custom-react-accordion";
import "../assets/css/Accordion.css";
import "custom-react-accordion/dist/Accordion.css";

const Accordion = ({ title }) => {
  const data = [
    {
      title: "What is Whisper",
      description:
        "Ac enim in fames interdum nulla diam. Facilisis diam ullamcorper aliquam felis. Proin sit arcu libero vitae eu vehicula morbi imperdiet. Vulputate tristique metus lacinia viverra turpis sed ipsum dui. Vitae fusce diam orci duis. Non a in placerat eu.",
    },
    {
      title: "Who is Whisper for?",
      description:
        "Egestas in sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi phasellus nibh. ",
    },
    {
      title: "Why use Whisper?",
      description:
        "Egestas in sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi phasellus nibh. ",
    },
    {
      title: "What can I do on Whisper?",
      description:
        "Egestas in sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi phasellus nibh. ",
    },
    {
      title: "Can I find people around me on Whisper?",
      description:
        "Egestas in sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi phasellus nibh. ",
    },
    {
      title: "Is Whisper free?",
      description:
        "Egestas in sagittis gravida volutpat. Volutpat urna nulla nec accumsan, cursus tempor donec dictumst amet. Morbi justo, et arcu a, fringilla non mi phasellus nibh. ",
    },
  ];
  return (
    <AccordionWrapper>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </AccordionWrapper>
  );
};

export default Accordion;
