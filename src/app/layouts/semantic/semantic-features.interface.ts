export interface SemanticFeatures {
    blockClassName: string;
    sectionCustomClassName?: string[];
    header: Record<string, any>;
    main: Record<string, any>;
    footer: Record<string, any>;
};
