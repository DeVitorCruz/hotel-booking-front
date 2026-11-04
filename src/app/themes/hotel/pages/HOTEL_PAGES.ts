import { HOME } from "./home/HOME";
import { Pages } from "../../../pages/pages.type";
import { SemanticFeatures } from "../../../layouts/semantic/semantic-features.interface";
import { INNER_PAGE } from "./INNER_PAGE";

export const HOTEL_PAGES: Pages = {
    home: HOME as SemanticFeatures,
    about: INNER_PAGE('about'),
    rooms: INNER_PAGE('rooms'),
    book: INNER_PAGE('book'),
    booking: INNER_PAGE('booking'),
    faq: INNER_PAGE('faq'),
    login: INNER_PAGE('login'),
    team: INNER_PAGE('team'),
    'team-single': INNER_PAGE('team-single'),
    blog: INNER_PAGE('blog'),
    contact: INNER_PAGE('contact'),
    '404': INNER_PAGE('404'),
};
