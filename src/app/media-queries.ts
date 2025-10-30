const size = {
    xs: "640px",
    sm: "1268px",
    lg: "1400px",
}
export const device = {
    xs: `(max-width: ${size.xs})`,
    sm: `(max-width: ${size.sm})`,
    lg: `(max-width: ${size.lg})`,
    landing_mobile: `(min-height: 75vw)`,
}

export const devices = {
    mobile: `@media  ${device.xs}`,
    tablet: `@media  ${device.sm}`,
    laptop: `@media  ${device.lg}`,
    landing_mobile: `@media  ${device.landing_mobile}`,
}
