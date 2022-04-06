import React, { useState, Component } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';


function SlidPane(props) {
  const {direction,width,state,setState,heading,element} = props
  const handleClose = () =>{ setState(false)
};
  return (
    <>
      <Offcanvas show={state} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{heading}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SlidPane;

// import React, { useEffect, useState } from "react";
// import SlidingPane from "react-sliding-pane";
// import "react-sliding-pane/dist/react-sliding-pane.css";
// // import GrClose from "../../assets/img/delete-icon.png";
// import useWindowDimensions from "../../deminesion";

// const SlidPane = (props) => {
//   // Prop Destructuring
//   const {direction,width,state,setState,Element,heading} = props
//   const {width:windowWidth } = useWindowDimensions();
//   useEffect(
//     ()=>{
//       console.log("dhfjhdshbjsdhjb")
//     }
//   ,[])
//   return (
    
//     <div>
//       <SlidingPane
//         // closeIcon = {<GrClose />}
//         isOpen={state}
//         from={direction}
//         width={(windowWidth<=width)?"100%":`${width}px`}
//         title={heading!==undefined ? heading:""}
//         onRequestClose={() => {setState(false);
        
//         console.log(direction,width,state,setState,Element,heading)
//         }}
//       >
//         {
//           props.children
//         }
//       </SlidingPane>
//     </div>
//   );
// };

// export default SlidPane;