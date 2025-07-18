import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      100: "#ee0795ff",
      200: "#9b59b6",
      300: "#0a0a0a",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#0a0a0a",
        color: "#fff",
      },
    },
  },
});

export default theme;
