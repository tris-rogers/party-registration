import { faBuildingColumns, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import type { PartyTypes } from "../types/party";

export const PARTY_TYPES: PartyTypes[] = [
    {
        id: 'Natural Person',
        name: 'Natural Person',
        icon: faCircleUser,
        fieldsKey: 'naturalPersonFields'
    },
    {
        id: 'Legal Entity',
        name: 'Legal Entity',
        icon: faBuildingColumns,
        fieldsKey: 'legalEntityFields'
    }
];