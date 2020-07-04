[@bs.scope "document"] [@bs.val] external body: Dom.element = "body";

module Overlay = {
  [@react.component]
  let make = (~children, ()) => {
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-start pt-24">
      children
    </div>;
  };
};

module Content = {
  [@react.component]
  let make = (~children, ()) => {
    <div className="w-2/3 bg-white max-w-lg"> children </div>;
  };
};

module Header = {
  [@react.component]
  let make = (~children, ()) => {
    <div className="pt-4 pl-4 pr-4 pb-0">
      <div className="pb-1 border-b border-black font-bold"> children </div>
    </div>;
  };
};

module Body = {
  [@react.component]
  let make = (~children, ()) => {
    <div className="p-4"> children </div>;
  };
};

module Footer = {
  [@react.component]
  let make = (~onSubmit, ~onClose, ()) => {
    <div className="p-4 flex justify-end">
      <Styles.Button buttonType=Styles.Button.Secondary onClick=onClose>
        "Close"->React.string
      </Styles.Button>
      <span className="p-1" />
      <Styles.Button buttonType=Styles.Button.Primary onClick=onSubmit>
        "Ok"->React.string
      </Styles.Button>
    </div>;
  };
};

let useModal = () => {
  let (isOpen, setIsOpen) = React.useState(_ => false);
  let openModal = () => setIsOpen(_ => true);
  let closeModal = () => setIsOpen(_ => false);

  (isOpen, openModal, closeModal);
};

[@react.component]
let make = (~header, ~isOpen, ~onSubmit, ~onClose, ~children, ()) => {
  isOpen
    ? ReactDOMRe.createPortal(
        <Overlay>
          <Content>
            <Header> header->React.string </Header>
            <Body> children </Body>
            <Footer onSubmit onClose />
          </Content>
        </Overlay>,
        body,
      )
    : React.null;
};
