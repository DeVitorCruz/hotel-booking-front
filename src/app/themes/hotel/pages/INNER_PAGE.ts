import { SemanticFeatures } from '../../../layouts/semantic/semantic-features.interface';

export const INNER_PAGE = (name: string): SemanticFeatures => ({
	blockClassName: `semantic-${name}`,
    header: {},
    main: {},
    footer: {}
});

