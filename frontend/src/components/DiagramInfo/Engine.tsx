import React from "react";

import { Box, Image } from "@chakra-ui/react";

const Engine = () => {
  return (
    <div>
      <h2>
        <strong>Engines</strong>
      </h2>
      <p>
        Engines make the <strong>tremendous power</strong> needed to propel the
        aircraft through the sky.
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\engines.jpg" />
      </Box>
      <br></br>
      <p>
        The engines "breathe in" massive amounts of air, mix it with fuel, and
        then <strong>ignite it</strong>, creating a controlled explosion that
        releases an incredible amount of energy.
      </p>
      <br></br>
      <p>
        The powerful explosion inside the engine creates a force that gets
        pushed out of the back of the engine at an{" "}
        <strong>extremely high speed</strong>. This force, also known as thrust,
        is what makes the plane zoom forward through the air.
      </p>
      <br></br>
      <Box>
        <Image src="..\..\src\assets\thrust.png" />
      </Box>
      <br></br>
      <p style={{ marginBottom: "10vh" }}>
        It's like blowing up a balloon and letting it go, but on a much larger
        and more controlled scale.
      </p>
    </div>
  );
};

export default Engine;
