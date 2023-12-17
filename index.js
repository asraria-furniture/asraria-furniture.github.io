import { OrgInfo } from "./common/js/org-info.js";
import { VAR } from "./constants/variables.constants.js";
import { LOCAL_VAR } from "./local-variables.constants.js";

export class Home {
    constructor() {
        this.searchVale = "";
    }
    static onInit() {
        const orgInfo = new OrgInfo();
        const home = new Home();

        orgInfo.setTitle();
        home.listen();

        return home;
    }
    onSearchClick(event) {
        const { left: searchRefLeftValue, top: searchRefTopValue } = event.currentTarget.getBoundingClientRect();

        const searchBarModalRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL);
        const searchBarModalContentRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL_CONTENT_ID);
        const inputRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_INPUT_ID);
        
        if (!searchBarModalRef) return;
        if (!searchBarModalContentRef) return;
        
        searchBarModalRef.style.display = "block";
        inputRef.focus();
        searchBarModalContentRef.style.transform = `translate(${searchRefLeftValue}px, ${searchRefTopValue}px)`;
    }
    onSearchBarModalClose(event) {
        const { x, y } = event.target.getBoundingClientRect();
        const searchBarModalRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL);
        const searchBarModalContentRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL_CONTENT_ID);
        const { top, left, width, height } = searchBarModalContentRef.getBoundingClientRect();
        
        if (left > x 
            || x > left+width
            || top > y
            || y > top+height) {
            searchBarModalRef.style.display = "none";
        }
    }
    onClearSeachInput() {
        const inputRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_INPUT_ID);
        const modalSearchTextClearRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_TEXT_CLEAR_ID);
        
        if (!inputRef) return;
        
        inputRef.value = "";
        this.searchVale = "";
        setTimeout(() => modalSearchTextClearRef.style.display = "none", 0);
    }
    onSearchText(str) {
        const modalSearchTextClearRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_TEXT_CLEAR_ID);
        
        this.searchVale = str;
        if (!modalSearchTextClearRef) return;

        modalSearchTextClearRef.style.display = str ? "block": "none";
    }
    listen() {
        const searchRef = document.getElementById(LOCAL_VAR.SEARCH_BAR);
        const searchBarModalOverlayRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL);
        const modalSearchTextClearRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_TEXT_CLEAR_ID);
        const searchInputRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_INPUT_ID);

        if (window.innerWidth < VAR.MEDIA_BEARKPOINT_WIDTH) return;

        searchRef.onclick = (event) => event.target ? this.onSearchClick(event) : null;
        searchBarModalOverlayRef.onclick = (event) => event.target ? this.onSearchBarModalClose(event) : null;
        modalSearchTextClearRef.onclick = (event) => event.target ? this.onClearSeachInput() : null;
        searchInputRef.oninput = (event) => event.target ? this.onSearchText(event.target.value): null;
    }
}

document.addEventListener("DOMContentLoaded", Home.onInit());