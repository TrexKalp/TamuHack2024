import React from "react";

import { Box, Image } from "@chakra-ui/react";

const Wing = () => {
  return (
    <div>
      <h2><strong>Wings</strong></h2>
      <p>
        As an airplane zooms through the air, the curved top of the wing makes
        the air above it move faster than the air below. This creates "lift"
        that takes the airplane off the ground and keeps it soaring through the
        clouds.
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\wings.jpg" />
      </Box>
      <br></br>
      <p>
        But the wings have more tricks up their sleeves. Ever notice those
        movable parts on the back? Ailerons, flaps, and slats help the pilot
        steer, speed up, slow down, and keep the airplane balanced. If you ever
        hear a loud whirring noise when the plane is close to landing, it's
        probably the control surfaces moving!
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\control_surfaces.jpg" />
      </Box>
      <br></br>
      <p>
        So, airplane wings are more than just cool shapes; they're carefully
        designed tools that make flight possible!
      </p>
    </div>
  );
};

export default Wing;
