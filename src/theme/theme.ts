import { createTheme } from "@mui/material"
import { blue, green, red } from "@mui/material/colors"
import { PaletteColor, PaletteColorOptions, dark, light } from "@mui/material/styles/createPalette"

declare module "@mui/material/styles" {
    interface Palette{
        incomeClolor : PaletteColor;
        expenseClolor : PaletteColor;
        balanceClolor : PaletteColor;
    }

    interface PaletteOptions {
        incomeClolor? : PaletteColorOptions;
        expenseClolor? : PaletteColorOptions;
        balanceClolor? : PaletteColorOptions;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP,sans-serif',
        fontWeightRegular:400,
        fontWeightMedium:500,
        fontWeightBold:700,
    },
    palette : {
        incomeClolor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        expenseClolor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        balanceClolor: {
            main: green[500],
            light: green[100],
            dark: green[700],
        }
    }
})