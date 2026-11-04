export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    /** Spatie role names, e.g. ['receptionist'] (sent by /login and /me). */
    roles?: string[];
    /** Effective permission names, e.g. ['bookings.view-any']. */
    permissions?: string[];
};
