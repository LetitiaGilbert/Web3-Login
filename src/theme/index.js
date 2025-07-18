import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#ffe4f7",
      100: "#fab8de",
      200: "#f48bc4",
      300: "#ee5daa",
      400: "#e93091",
      500: "#d01678",
      600: "#a0115e",
      700: "#700b44",
      800: "#40062a",
      900: "#1a0111",
    },
  },
});

export default theme;
