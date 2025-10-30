import styled from "styled-components";

const PurpleButton = styled.button`
display: flex;
// max-width: 280px;
flex-direction: column;
font-size: 16px;
opacity: ${props => props.disabled ? 0.4 : 1};
color: #fff;
font-weight: 700;
text-align: center;
justify-content: center;
white-space: nowrap;
cursor: pointer;
p {
    font-family: Gilroy, sans-serif;
    border-radius: 52px;
    background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 50%
    ),
    linear-gradient(90deg, #4b1aff 0%, #c0f 49.76%, #8000ff 100%),
    linear-gradient(90deg, #ff8a00 0%, #d400ff 50%, #8000ff 100%),
    linear-gradient(90deg, #ff8a00 0%, #d400ff 50%, #8000ff 100%);
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5),
    0px 0px 20px 0px rgba(255, 255, 255, 0.7) inset;
    justify-content: center;
    padding: 15px 56px;
}
`;


export default PurpleButton;