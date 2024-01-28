import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Cockpit = () => {
  return (
    <div>
      <h2><strong>Cockpit</strong></h2>
      <p>
        An airplane cockpit is a high-tech control room where the pilot
        sits to fly the plane. It's filled with buttons, switches, and screens
        that help the pilot control everything - from altitude to speed.
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\cockpit.jpeg" />
      </Box>
      <br></br>
      <p>
        The cockpit is designed for efficiency and safety. There are large
        screens displaying important information like altitude and airspeed.
        In case anything goes wrong, there are backup instruments to ensure a
        safe flight.
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\screens.jpg" />
      </Box>
      <br></br>
      <p>
        So, in simple terms, the cockpit is where the magic happens. It's the
        heart of the airplane, where skilled pilots use advanced tools to make
        sure everyone has a smooth and safe flight.
      </p>
    </div>
  );
};

export default Cockpit;
