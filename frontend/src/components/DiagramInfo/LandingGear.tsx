import React from "react";

import { Box, Image } from "@chakra-ui/react";

const LandingGear = () => {
  return (
    <div>
      <h2>
        <strong>Landing gear</strong>
      </h2>
      <br></br>
      <p>
        Landing gear are essentially the aircraft's <strong>legs</strong>.
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\landing_gear.jpeg" />
      </Box>
      <br></br>
      <p>
        The landing gear comprises several elements, including robust
        <strong> shock-absorbing</strong> struts and a set of wheels. When the
        plane is on the ground, the landing gear allows for smooth movement,
        almost <strong>like a car</strong>. However, as the plane ascends into
        the sky, the landing gear performs a remarkable feat - it{" "}
        <strong>retracts into the fuselage or wings</strong>, minimizing air
        resistance and optimizing the aerodynamics of the aircraft.
      </p>
      <br></br>
      <p>
        During the process of landing, the landing gear{" "}
        <strong>extends once again</strong>. If you hear a loud thud when the plane is about to land, it's probably the landing gear deploying!
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\engineer.jpg" />
      </Box>
      <br></br>
      <p style={{ marginBottom: "10vh" }}>
        Engineers carefully consider their designs to create landing gear
        systems that not only provide stability on the ground but also
        contribute to the
        <strong> overall efficiency and safety of air travel</strong>.
      </p>
    </div>
  );
};

export default LandingGear;
