import { InputGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { removeUser } from "../../store/modules/users";
import EventLogo from "../../../public/images/dashboard.png";
import { RootStore } from "../../store";
import EventList from "./eventList";
import { useEffect, useState, useCallback } from "react";
import baseAPI from "../../services/api";
import "./sideBar.scss";
import CreateEvent from "./modal";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/Dropdown";
import { getEventListByUser } from "../../services/userServices";

export default function SideBar() {
  const user = useSelector((store: RootStore) => store.userReduce);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exit = () => {
    window.localStorage.clear();
    dispatch(removeUser());
    navigate("/");
  };
  const [events, setEvents] = useState<any[]>([]);

  const fetchUser = useCallback(async () => {
    const response = await getEventListByUser(user.id).then((res) => {
      return res.data;
    });

    console.log(response);
    setEvents(response);
    console.log("events", events);
  }, [setEvents, user.id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // console.log(`aaaaaa ${event.length} asd`)

  return (
    <div className="vh-100 d-flex">
      <div className="d-flex flex-column align-items-center stylesidebar">
        <div className="">
          <img src="/images/logotipo2.png" alt="logo" className="mt-5 mb-4" />
        </div>
        <div className="me-auto">
          <br />
          <br />
          <Avatar name={user.name} round={true} size="64" textSizeRatio={3.9} />

          <span className="ms-3 text-bold" style={{ color: "white" }}>
            {user.name}
          </span>
        </div>
        <InputGroup className="mt-4 me-auto">
          <Form.Control
            placeholder="Buscar..."
            aria-label="Buscar"
            aria-describedby="basic-addon2"
          />
          <Button className="bg-primary">
            <BsSearch />
          </Button>
        </InputGroup>
        <span className="mt-5 me-auto events-font" style={{ color: "white" }}>
          <Link className="linkEvent" to={"/evento"}>
            <img className="mb-2 px-2" src={EventLogo} alt="Logo" />
            Meus Eventos
          </Link>
        </span>
        <hr className="mb-4" />
        {events.length > 0 ? (
          events.map((event) => (
            <div className="d-flex justify-content-between text-white fs-5 w-100 mb-4">
              <div className="">{event.name}</div>
              <div className="">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="sucess"
                    id="dropdown-basic"
                    className="dropdown-img"
                  >
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Deletar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))
        ) : (
          <EventList />
        )}

        <hr />
        {events.length > 0 && <CreateEvent setEvents={setEvents} />}
        <Button className="logoff-botao w-100 m-4 " onClick={exit}>
          <IoExitOutline className="me-2" />
          Fazer Logoff
        </Button>
      </div>
    </div>
  );
}
