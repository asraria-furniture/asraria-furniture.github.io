import { CONF, VAR } from "../../constants/index.js";

export class OrgInfo {
    setTitle() {
        const title_list = document.getElementsByTagName(VAR.TITLE);

        for (const iterator of title_list) {
            iterator.innerHTML = CONF.ORG_NAME;
        }
    }
}