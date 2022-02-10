import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { HomeContainerPage } from "../Home/HomeContainer.page";
import customer from "../../assets/css/customerHome.module.css";
import { Input } from "antd";
import { AiOutlineSearch, BiSearchAlt } from "react-icons/all";
import styles from "../../assets/css/providerHome.module.css";
import { customerDiscover, providerLikes } from "../../components/dataSets";
import routes from "../../routes";
import "../../assets/css/chat.css";
import shield from "../../assets/images/chat/shield.svg";
import send from "../../assets/images/chat/send.svg";

const ChatPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();

  const [allLikes, setAllLikes] = useState(customerDiscover);
  const [currentChat, setCurrentChat] = useState(customerDiscover[0]);
  const [showMsgs, setShowMsgs] = useState(false);
  const chatMsgs = [
    {
      id: 1,
      sender: "hello. ",
      receiver: "Hi. ",
    },
    {
      id: 2,
      sender: "how are you doing today?. ",
      receiver: "im doing fine thank you. ",
    },
    {
      id: 3,
      sender: "dts great. ",
      receiver: "Yeah ",
    },
    {
      id: 4,
      sender: "How has bin your education",
      receiver: "We dey push am",
    },
    {
      id: 5,
      sender: "okay. ",
      receiver: "Bye",
    },
    {
      id: 6,
      sender:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad adipisci animi asperiores consequuntur cupiditate, debitis distinctio dolor doloremque facere ipsum modi neque nesciunt nisi nulla numquam odit officiis omnis perspiciatis placeat possimus quae quidem quisquam rem sequi ullam vel voluptatibus! Aut delectus dicta eaque libero modi quasi repellendus vel? Ad aspernatur aut consequatur cum dignissimos dolor eius, eos esse eum excepturi illum inventore ipsum iusto magni maxime mollitia nesciunt non numquam quod quos reiciendis repellendus, sint, soluta totam ut vel veniam? Adipisci cum enim iusto laudantium, nihil rerum sequi soluta vel voluptatum! Aliquid architecto asperiores, cupiditate doloribus et eum numquam omnis porro praesentium quia quidem reprehenderit velit voluptatem! Aperiam assumenda corporis, est inventore ullam velit voluptas! A alias amet architecto assumenda aut cumque, cupiditate dignissimos dolore dolorum earum enim harum iure iusto labore laboriosam minima minus modi nam natus nihil nostrum obcaecati officiis perspiciatis placeat quaerat quas quidem quo repellendus repudiandae sint sunt totam vel voluptatum? Commodi eos hic, ipsam maxime omnis quos? Aliquam aliquid assumenda blanditiis commodi consequuntur culpa cum cumque delectus, dicta dignissimos doloremque doloribus ducimus error excepturi expedita explicabo harum, impedit in iure laudantium maiores maxime modi odit officiis placeat possimus quae quaerat quos recusandae repellendus rerum similique sint totam ut vitae voluptatem, voluptatibus. Animi architecto, aut consectetur consequuntur cumque ducimus eaque eius esse est, illo ipsa neque non quisquam saepe sed. Consequatur doloremque eius perspiciatis quibusdam. Aperiam asperiores atque consectetur, dolor doloribus ducimus eligendi eos est eum excepturi exercitationem illo in iste labore magni minus mollitia nam nemo possimus quaerat quas quo repellat repellendus tempore voluptatibus. Accusantium aliquid animi consequuntur distinctio, dolorum fugiat id ipsa minima necessitatibus omnis praesentium quidem, sit tempora, temporibus ullam veniam voluptatem? Accusantium doloremque itaque maiores minima nostrum officiis quam quasi quis, rem veritatis? Blanditiis cupiditate incidunt iure vero! Alias aliquam architecto autem dolores esse est eum facilis fugiat illum impedit itaque, iusto maiores natus non officia omnis porro provident quaerat quisquam repellendus sapiente similique soluta tempore ullam vel. Accusamus adipisci atque autem blanditiis commodi consectetur consequatur consequuntur deleniti dignissimos dolorum eligendi enim et ex fuga harum hic illo itaque laboriosam, libero molestias nemo nesciunt, nulla omnis placeat porro praesentium quibusdam quisquam ratione rerum saepe unde ut vel voluptas. Aliquam dignissimos nihil nobis veniam voluptatem. Ad cupiditate, fuga illo molestias mollitia optio quis! Commodi, distinctio eaque et excepturi facilis fugiat illo maxime nesciunt, obcaecati perspiciatis possimus quae quos rem repellat, sequi sint tempora temporibus velit vitae voluptatum! Asperiores atque aut consequatur eaque illum magni nostrum praesentium repellat sint vero. Architecto dicta dolor, id maxime minima neque nihil, nostrum odit officiis optio sapiente sit, tempora velit? Architecto doloremque eius eos error labore laudantium, molestiae, necessitatibus nulla obcaecati quia quibusdam quisquam sequi temporibus? Accusamus ad at, distinctio doloremque dolorum eaque excepturi exercitationem explicabo incidunt laboriosam minus nemo nisi officia quo repellat sapiente sed sunt tenetur, veniam voluptas! Adipisci aliquid amet beatae consequuntur cum debitis delectus dolor eaque eius est, id iste laboriosam molestias natus necessitatibus nihil, obcaecati, porro quibusdam quisquam repudiandae rerum sint sit. Amet commodi cupiditate iure sit voluptatibus. Atque blanditiis culpa magni nostrum, officia qui voluptates! Aliquam amet, aperiam asperiores assumenda eius enim est ex, expedita fugit, hic illo in inventore laboriosam maiores neque nihil nostrum officia optio porro similique soluta ullam vitae? Commodi fuga incidunt iste quo totam? Aliquid asperiores, consectetur consequatur cum cupiditate, delectus dolores eum explicabo illum, labore mollitia nostrum nulla obcaecati perspiciatis quaerat quidem repellendus saepe? Dolore ipsam, velit. Error eum fugiat iste iusto labore mollitia quae, temporibus voluptas. Atque excepturi expedita explicabo fugit illum maxime mollitia. Aspernatur facere minima nemo recusandae tenetur. Animi est ipsam mollitia sequi vitae. Ad adipisci aliquam amet animi architecto assumenda aut debitis, deleniti deserunt ea eaque earum eos expedita inventore ipsam labore laboriosam laudantium nihil nisi nostrum, omnis pariatur quam quia quis quo quod rem repellat sit soluta sunt, ut veniam voluptatem voluptatum? Aperiam asperiores aut corporis dolor expedita id minima molestiae molestias nemo nobis odit officia pariatur provident rem repellendus, saepe veritatis voluptatum! Molestiae quam sed similique veniam. Commodi delectus fugit nostrum possimus quas quasi tempora veniam. Aut blanditiis consequatur corporis, doloremque doloribus ducimus eos ipsum odio quae quisquam sunt, tempora vero voluptate? Aperiam architecto at deserunt, est molestiae, nobis, nostrum pariatur porro reiciendis rem sapiente tempora temporibus unde vero voluptatibus. Ad animi deserunt eos, ex facere officia optio quam quasi quidem? Deserunt, provident sed. Amet aperiam architecto atque consequatur consequuntur culpa debitis dignissimos error esse fugiat, omnis possimus quasi quis saepe, ut vel vero. Aliquid atque autem facere fuga fugit illo magni quasi quia recusandae rerum. Accusamus amet deserunt eum ipsum maiores non numquam possimus sequi? Accusamus aperiam assumenda cumque debitis distinctio eaque eum exercitationem fugiat id ipsam ipsum necessitatibus perferendis perspiciatis porro repellat sapiente similique sunt suscipit veritatis, vero. Ab at cupiditate dicta fuga impedit inventore ipsum laboriosam mollitia, necessitatibus nostrum, quasi reprehenderit vel voluptas? Amet atque beatae delectus dignissimos dolor explicabo illo inventore iste laudantium maxime nemo officia provident quae quos, ratione, repudiandae sequi sint sit soluta tempora voluptas voluptatem voluptatibus. Ab assumenda consequatur eum harum ipsum nemo odio qui, ullam veritatis voluptas. Accusamus consequuntur dolore dolorem, eveniet fuga hic illum ipsa ipsum, modi neque non nulla odio optio perspiciatis quisquam quod suscipit ut vero? Alias aperiam assumenda blanditiis consequatur cumque distinctio dolore ducimus eius error illum ipsum iure iusto natus nulla perspiciatis, quam qui quisquam quod recusandae repudiandae saepe similique totam voluptatem! Adipisci dolore ea eaque ipsam iure modi nam nobis qui, totam voluptates. Consequuntur dolorum eos exercitationem expedita pariatur placeat vel? Ab ad aliquam cumque dolores, dolorum eaque esse, fugit hic libero nam quis quisquam repellendus sequi, similique soluta tempora ut vero. A aspernatur, corporis culpa cupiditate dicta earum eius enim et ex facilis, fugit harum id illo illum incidunt iste itaque iusto natus necessitatibus, nemo obcaecati optio possimus quas quis rerum tempora temporibus voluptate? At impedit non praesentium unde? A accusantium aut beatae consequuntur debitis eaque eligendi est explicabo fuga hic incidunt ipsa iste labore obcaecati possimus qui, quia quisquam quod repellendus tempora. Nihil.. ",
      receiver: "Bye",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, showMsgs]);
  const handleSetCurrentProfile = (id) => {
    history.push(`${routes.CUSTOMER_HOME}/id`);
  };

  return (
    <HomeContainerPage>
      <div className="row chat">
        <div className={`col-md-3 chat__list ${showMsgs && "chat__hide__col"}`}>
          <Input
            name="search"
            prefix={
              <AiOutlineSearch className="text-muted" size="2rem" color="red" />
            }
          />
          <br />
          <br />
          <h5>New Matches</h5>
          <br />
          <div className="thumbnailGridContainer">
            {allLikes?.slice(0, 4)?.map((item, index) => (
              <div
                className="position-relative cursor"
                onClick={() => handleSetCurrentProfile(item?.id, index)}
                key={item?.id}
              >
                <img
                  src={item?.imgUrls[0]}
                  alt=""
                  className="galleryImgThumbnail"
                />
              </div>
            ))}
          </div>
          <br />
          <br />
          <div className="dotted-divider w-100" />
          <br />
          <h5 className="mb-2">Messages</h5>
          {allLikes?.slice(5, 9)?.map((item, index) => (
            <div
              className="position-relative cursor mb-3 d-flex align-items-center"
              onClick={() => {
                setCurrentChat(item);
                setShowMsgs(!showMsgs);
              }}
              key={item?.id}
            >
              <img
                src={item?.imgUrls[0]}
                alt=""
                className="galleryImgThumbnail mr-2"
                style={{ height: "7.2rem" }}
              />
              <div>
                <h5 className="padding-none">{item?.name}</h5>
                <div>
                  <small className="text-muted">
                    Lorem ipsum dolor sit amet.
                  </small>
                </div>
              </div>
            </div>
          ))}
          <br />
          <br />
        </div>

        <div
          className={`col-md-9 chat__msgs ${!showMsgs && "chat__hide__col"}`}
        >
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {mobile && (
                  <FontAwesomeIcon
                    icon={icons.faArrowLeft}
                    size=""
                    className="primary-text mr-3"
                    onClick={() => setShowMsgs(!showMsgs)}
                  />
                )}
                <img
                  src={currentChat?.imgUrls[0]}
                  alt=""
                  className="galleryImgThumbnail mr-3"
                  style={{ height: "4rem", width: "4rem" }}
                />
                <h5 className="padding-none">{currentChat?.name}</h5>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-primary-light btn-sm d-flex align-items-center"
                  style={{ height: "4.1rem", borderRadius: "20.5px" }}
                >
                  Make Payment
                </button>
                <img
                  src={shield}
                  alt=""
                  className="ml-3 img-fluid"
                  style={{
                    height: "2.1rem",
                    width: "2rem",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </>
          <br />
          <div className="dotted-divider w-100" />
          <>
            <div className="py-3 overflow-auto" style={{ height: "90%" }}>
              {chatMsgs?.map((item) => (
                <>
                  <div className=" mb-4">
                    <p className="padding-none conversation conversation__sender">
                      {item?.sender}
                    </p>
                  </div>
                  <div className="receiver__container mb-4">
                    <p className="padding-none conversation conversation__receiver">
                      {item?.receiver}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </>
          <>
            <div
              className="d-flex align-items-center justify-content-between position-fixed bg-white"
              style={
                mobile
                  ? { bottom: "0", width: "85%" }
                  : { bottom: "0", width: "68%" }
              }
            >
              <Input.TextArea
                rows={2}
                name="message"
                allowClear
                placeholder="Message..."
              />
              <img
                src={send}
                className="img-fluid ml-3"
                alt=""
                style={{
                  width: "4.8rem",
                  height: "4.8rem",
                  marginTop: "-1rem",
                }}
              />
            </div>
          </>
        </div>
      </div>
    </HomeContainerPage>
  );
};

export default ChatPage;
