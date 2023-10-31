import { styled } from "@stitches/react";

export const Container = styled("div", {
  padding: "2rem",
  borderRadius: ".5rem",
  color: "$gray800",
  position: "relative",

  backgroundColor: "$gray200",
});

export const Settings = styled("div", {
  padding: "2rem",
  borderRadius: "2rem",
  position: "absolute",
  right: "-1rem",
  top: "-1rem",
  display: "flex",
  gap: ".5rem",

  "> svg": {
    cursor: "pointer",
  },

  "> svg:first-child:hover": {
    color: "$gray400",
  },
  "> svg:last-child:hover": {
    color: "#f00000",
  },
});

export const Content = styled("div", {
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  h3: {
    fontSize: ".8rem",
    color: "$gray600",
    marginBottom: ".3rem",
  },
  span: {
    color: "$gray800",
  },
});
