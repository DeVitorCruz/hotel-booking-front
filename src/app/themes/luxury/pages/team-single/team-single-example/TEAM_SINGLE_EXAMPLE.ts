import { MediaImg } from "@core/models/media/media-img.interface";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TeamSingleContent } from "@ui-building/team-single/team-single.interface";
import { TEAM_IMAGE } from "./TEAM_IMAGE";
import { SOCIAL_LINKS } from "./SOCIAL_LINKS";

export const TEAM_SINGLE_EXAMPLE: TeamSingleContent = {
    image: TEAM_IMAGE as MediaImg,
    name: 'Frederick Norris' as string,
    role: 'Designation' as string,
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam mollitia numquam magnam deleniti saepe at ea dolorum doloremque, quaerat adipisci exercitationem facilis obcaecati corporis sit doloribus laborum dolore praesentium blanditiis?' as string,
    email: 'frederickNorris@email.com' as string,
    phone: '(21) 9 3850-0081' as string,
    socialLinks: SOCIAL_LINKS as AnchorFlexItem[],
    extraContent: [
        {
          id: 0 as number,
          text: ['Extra Content'] as string[],
          customBlockClassName: 'extra-content-example-block' as string,
        } as TextBox,
    ] as TextBox[],
} as TeamSingleContent; 