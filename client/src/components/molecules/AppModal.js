import { useState } from "react";
import AppButton from "../atoms/AppButton";

const Header = () => null;
const Body = () => null;
const Footer = () => null;

const AppModal = ({ defaultOpen, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  const header = children.find((el) => el.type === Header);
  const body = children.find((el) => el.type === Body);
  const footer = children.find((el) => el.type === Footer);

  return (
    <div className={`modal ${!open || "d-block"}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {header ? header.props.children : null}

            <AppButton
              className="btn-light close justify-content-end"
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              onClickCallback={() => {}}
            >
              <span aria-hidden="true">&times;</span>
            </AppButton>
          </div>
          <div className="modal-body">{body ? body.props.children : null}</div>
          <div className="modal-footer">
            {footer ? footer.props.children : null}
          </div>
        </div>
      </div>
    </div>
  );
};

AppModal.Header = Header;
AppModal.Body = Body;
AppModal.Footer = Footer;

export default AppModal;
