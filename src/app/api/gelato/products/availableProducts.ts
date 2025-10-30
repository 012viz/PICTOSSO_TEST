import { TProduct } from "@/types";

export default [
    {
        name: "XS", price: { eur: 25, usd: 25, gbp: 19 }, max_recommanded_icons: 2500, frame_width: 15, frame_height: 20, frame_width_inches: 6, frame_height_inches: 8, details: [
            { color: "Black", uid: "framed_poster_mounted_150x200-mm-6x8-inch_black_wood_w12xt22-mm_plexiglass_150x200-mm-6x8-inch_200-gsm-80lb-uncoated_4-0_ver" },
            { color: "White", uid: "framed_poster_mounted_150x200-mm-6x8-inch_white_wood_w12xt22-mm_plexiglass_150x200-mm-6x8-inch_200-gsm-80lb-uncoated_4-0_ver" }
        ],
    },
    {
        name: "Small", price: { eur: 39, usd: 39, gbp: 29 }, max_recommanded_icons: 2500, frame_width: 30, frame_height: 40, frame_width_inches: 12, frame_height_inches: 16, details: [
            { color: "Black", uid: "framed_poster_mounted_300x400-mm-12x16-inch_black_wood_w12xt22-mm_plexiglass_300x400-mm-12x16-inch_170-gsm-65lb-coated-silk_4-0_ver" },
            { color: "White", uid: "framed_poster_mounted_300x400-mm-12x16-inch_white_wood_w12xt22-mm_plexiglass_300x400-mm-12x16-inch_170-gsm-65lb-coated-silk_4-0_ver" }
        ],
    },
    {
        name: "Medium", price: { eur: 59, usd: 59, gbp: 49 }, min_recommanded_icons: 2500, max_recommanded_icons: 4500, frame_width: 45, frame_height: 60, frame_width_inches: 18, frame_height_inches: 24, details: [
            { color: "Black", uid: "framed_poster_mounted_450x600-mm-18x24-inch_black_wood_w12xt22-mm_plexiglass_450x600-mm-18x24-inch_170-gsm-65lb-coated-silk_4-0_ver" },
            { color: "White", uid: "framed_poster_mounted_450x600-mm-18x24-inch_white_wood_w12xt22-mm_plexiglass_450x600-mm-18x24-inch_170-gsm-65lb-coated-silk_4-0_ver" }
        ],
    },
    {
        name: "Large", price: { eur: 90, usd: 90, gbp: 79 }, max_recommanded_icons: 4500, frame_width: 60, frame_height: 80, frame_width_inches: 24, frame_height_inches: 32, details: [
            { color: "Black", uid: "framed_poster_mounted_600x800-mm-24x32-inch_black_wood_w12xt22-mm_plexiglass_600x800-mm-24x32-inch_170-gsm-65lb-coated-silk_4-0_ver" },
            { color: "White", uid: "framed_poster_mounted_600x800-mm-24x32-inch_white_wood_w12xt22-mm_plexiglass_600x800-mm-24x32-inch_170-gsm-65lb-coated-silk_4-0_ver" }
        ],
    },
] as TProduct[]
