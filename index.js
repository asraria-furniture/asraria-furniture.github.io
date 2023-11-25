import { OrgInfo } from "./common/js/org-info.js";
import { CONF } from "./constants/configs.contants.js";
import { VAR } from "./constants/variables.constants.js";
import { LOCAL_VAR } from "./local-variables.constants.js";

export class Home {
    static onInit() {
        const orgInfo = new OrgInfo();
        const home = new Home();
        
        orgInfo.setTitle();
        home.setLogo();
        home.setDepartments();
    }
    setLogo() {
        const tagRef = document.getElementById(LOCAL_VAR.MAIN_LOGO_ID);

        if (tagRef) tagRef.innerText = CONF.ORG_NAME;
    }
    setDepartments() {
        const tagRef = document.getElementById(LOCAL_VAR.MAIN_HEADER_DEPARTMENT_DROPDOWN_MENU_ID);

        if (!tagRef) return;

        for (const departmentKey in CONF.DEPARTMENTS) {
            if (Object.hasOwnProperty.call(CONF.DEPARTMENTS, departmentKey)) {
                const departmentValue = CONF.DEPARTMENTS[departmentKey];
                const spanRef = document.createElement(VAR.SPAN);
        
                spanRef.textContent = departmentValue;
                tagRef.appendChild(spanRef);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", Home.onInit());