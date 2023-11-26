import { OrgInfo } from "./common/js/org-info.js";
import { CONF } from "./constants/configs.contants.js";
import { VAR } from "./constants/variables.constants.js";
import { LOCAL_VAR } from "./local-variables.constants.js";

export class Home {
    constructor() {
        this.searchText = "";
    }
    static onInit() {
        const orgInfo = new OrgInfo();
        const home = new Home();

        orgInfo.setTitle();
        home.setLogo();
        home.setDepartments();
        home.listenSearchInput();
        home.listenSearchInputCloseClick();

        return home;
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
    onSearch(searchText) {
        const iconRef = document.getElementById(LOCAL_VAR.MAIN_HEADER_SEARCH_INPUT_CLOSE_ICON_ID);
        
        this.searchText = searchText;
        iconRef.style.display = searchText ? "block" : "none";
    }
    onClickClearSearchInput() {
        const inputRef = document.getElementById(LOCAL_VAR.MAIN_HEADER_SEARCH_INPUT_ID);
        
        inputRef.value = "";
        this.onSearch("");
        inputRef.focus();
    }
    listenSearchInput() {
        const inputRef = document.getElementById(LOCAL_VAR.MAIN_HEADER_SEARCH_INPUT_ID);
        
        if (window.innerWidth < VAR.MEDIA_BEARKPOINT_WIDTH) return;
        
        inputRef.oninput = (event) => event.target ? this.onSearch(event.target.value) : null;
    }
    listenSearchInputCloseClick() {
        const closeIconRef = document.getElementById(LOCAL_VAR.MAIN_HEADER_SEARCH_INPUT_CLOSE_ICON_ID);
        
        closeIconRef.onclick = () => this.onClickClearSearchInput();
    }
}

document.addEventListener("DOMContentLoaded", Home.onInit());