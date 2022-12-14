import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BreadcrumbItem } from "../../utils/types";
import "./breadCrumbs.scss";

type BreadProps = {
  items: BreadcrumbItem[];
};

export default function BreadCrumbs(props: BreadProps) {
  return (
    <div className="header-link">
      <Breadcrumb>
        <AiOutlineArrowLeft className="mt-2 me-2" />
        {props.items.map((item) => (
          <Breadcrumb.Item>
            <Link className="header-font " to={item.link ?? ""}>
              {item.name}
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}
