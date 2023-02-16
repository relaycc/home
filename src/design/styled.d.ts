import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    radius: {
      xs: string;
      s: string;
      m: string;
      lg: string;
      xl: string;
    };
    colors: {
      gray: {
        0: string;
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      primary: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      secondary: {
        100: string;
        300: string;
        500: string;
        700: string;
        900: string;
      };
      accent: {
        100: string;
        300: string;
        500: string;
        700: string;
        900: string;
      };
      error: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      warning: {
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      success: {
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
    };
  }
}
