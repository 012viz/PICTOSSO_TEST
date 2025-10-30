import { Button } from "@mui/material";
import styled from "styled-components";

export const CustomButtonGroup = styled.div`
  overflow: hidden;
`;

export const CustomButton = styled(Button)`
    background-color: transparent;
    margin: 0;
    border: none;
    border-radius: 0;
    &:hover {
        background-color: #efefef;
    }
`;
