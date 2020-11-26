import { IconDefinition, IconLookup, library, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core'
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faAtom, faCogs, faCopy, faDatabase, faEdit, faSpinner, faStar as faStarSolid, faTools, faTrash, faUpload, } from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons/faStar";

function initializeLibrary() {
    library.add(
        faEdit,
        faAtom,
        faCogs,
        faTools,
        faDatabase,
        faSpinner,
        faCopy,
        faLinkedin,
        faGithub,
        faUpload,
        faStarSolid,
        faStar as IconDefinition,
        faTrash
    )
}

function getIcons(): IconLookup[] {
    // @ts-ignore
    const raw = library.definitions;

    const icons: IconLookup[] = [];

    for (let prefix in raw) {
        for (let iconName in raw[prefix]) {
            icons.push({
                prefix: prefix as IconPrefix,
                iconName: iconName as IconName,
            })
        }
    }

    return icons;
}

export default class Icons {
    public static Initialize() {
        initializeLibrary();
    }

    public static GetIcons() {
        return getIcons();
    }
}