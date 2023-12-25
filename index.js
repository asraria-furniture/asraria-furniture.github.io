import { OrgInfo } from "./common/js/org-info.js";
import { CONF } from "./constants/configs.contants.js";
import { VAR } from "./constants/variables.constants.js";
import { LOCAL_VAR } from "./local-variables.constants.js";

export class Home {
    constructor() {
        this.searchVale = "";
        this.placeholder = "What are you looking for?";
        this.searchedFilterList = [];
    }
    static onInit() {
        const orgInfo = new OrgInfo();
        const home = new Home();
        
        orgInfo.setTitle();
        home.setDepartments();
        home.setSearchBarModalChipList();
        home.listen();
        
        return home;
    }
    setDepartments() {
        const deptRef = document.getElementById(LOCAL_VAR.MAIN_DEPARTMENT_ID);
        deptRef.innerHTML = "";
        for (const key in CONF.DEPARTMENTS) {
            if (Object.hasOwnProperty.call(CONF.DEPARTMENTS, key)) {
                const element = CONF.DEPARTMENTS[key];
                const span = document.createElement(VAR.SPAN);
                span.innerText = element;
                deptRef.appendChild(span)
            }
        }
    }
    setFilteredSearch() {
        const mainSearchBarModalSearchResultFetchedRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL_SEARCH_RESULT_FETCHED_ID);
        mainSearchBarModalSearchResultFetchedRef.innerHTML = "";
        
        if (!this.searchedFilterList.length) return mainSearchBarModalSearchResultFetchedRef.style.display = "none";

        for (const iterator of this.searchedFilterList) {
            const div = document.createElement(VAR.DIV);
            const img = document.createElement(VAR.IMG);
            const nestedDiv = document.createElement(VAR.DIV);
            const span = document.createElement(VAR.SPAN);
            const leftMilestoneFlag = iterator.toLowerCase().indexOf(this.searchVale.toLowerCase())
            const rightMilestoneFlag = leftMilestoneFlag + this.searchVale.length;
            const leftSubstring = iterator.slice(0, leftMilestoneFlag);
            const middleSubstring = iterator.slice(leftMilestoneFlag, rightMilestoneFlag);
            const rightSubstring = iterator.slice(rightMilestoneFlag);

            span.innerText = middleSubstring;
            nestedDiv.innerHTML = leftSubstring + span.outerHTML + rightSubstring;
            img.src = "./statics/images/history-icon.svg";
            img.alt = "history-icon";
            div.appendChild(img);
            div.appendChild(nestedDiv);
            mainSearchBarModalSearchResultFetchedRef.appendChild(div);
        }
    }
    filterSearch(str) {
        this.searchedFilterList = Object.values(CONF.SUB_CATEGORY)
        .filter(value => value.toLowerCase().includes(str.toLowerCase()))
        .slice(0, 6);
        
        this.setFilteredSearch();
    }
    setSearchBarModalChipList() {
        const searchBarModalChipListRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL_CHIP_LIST_WRAPPER_ID);

        if (!searchBarModalChipListRef) return;

        for (const chipKey in CONF.SEARCH_BAR_MODAL_CHIP_LIST) {
            if (Object.hasOwnProperty.call(CONF.SEARCH_BAR_MODAL_CHIP_LIST, chipKey)) {
                const chipValue = CONF.SEARCH_BAR_MODAL_CHIP_LIST[chipKey];
                const span = document.createElement(VAR.SPAN);
                span.innerText = chipValue;
                searchBarModalChipListRef.appendChild(span);
            }
        }
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
        const modalSearchResultPopularRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_RESULT_POPULAR_ID);
        const mainSearchBarModalSearchResultFetchedRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL_SEARCH_RESULT_FETCHED_ID);
        const searchBarTextRef = document.querySelector(`#${LOCAL_VAR.SEARCH_BAR} > ${VAR.DIV}`);
        const searchBarPlaceholderRef = document.querySelector(`#${LOCAL_VAR.SEARCH_BAR} > ${VAR.SPAN}`);
        
        if (!inputRef) return;
        
        inputRef.value = "";
        this.searchVale = "";
        this.searchedFilterList = [];
        searchBarTextRef.innerText = "";
        searchBarPlaceholderRef.innerText = this.placeholder;
        setTimeout(() => {
            modalSearchTextClearRef.style.display = "none";
            modalSearchResultPopularRef.style.display = "flex";
            mainSearchBarModalSearchResultFetchedRef.style.display = "none";
        }, 0);
    }
    onSearchText(str) {
        const modalSearchTextClearRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_TEXT_CLEAR_ID);
        const modalSearchResultPopularRef = document.getElementById(LOCAL_VAR.MODAL_SEARCH_RESULT_POPULAR_ID);
        const mainSearchBarModalSearchResultFetchedRef = document.getElementById(LOCAL_VAR.MAIN_SEARCH_BAR_MODAL_SEARCH_RESULT_FETCHED_ID);
        const searchBarTextRef = document.querySelector(`#${LOCAL_VAR.SEARCH_BAR} > ${VAR.DIV}`);
        const searchBarPlaceholderRef = document.querySelector(`#${LOCAL_VAR.SEARCH_BAR} > ${VAR.SPAN}`);
        this.searchVale = str;
        searchBarTextRef.innerText = str;
        searchBarPlaceholderRef.innerText = str ? "" : this.placeholder;

        if (!modalSearchTextClearRef) return;
        modalSearchTextClearRef.style.display = str ? "block": "none";
        if (!modalSearchResultPopularRef) return;
        modalSearchResultPopularRef.style.display = str ? "none" : "flex";
        if (!mainSearchBarModalSearchResultFetchedRef) return;
        mainSearchBarModalSearchResultFetchedRef.style.display = str ? "flex" : "none";
        
        this.filterSearch(str);
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