let currentArraySize = 20;
let sortingSpeed = 1000;
let rangeSliderSize = document.querySelector(".slider");
let rangeSliderSpeed = document.querySelector(".sliderSpeed");
let array = document.querySelector(".arrayContainer");
let generateNewArray = document.getElementById("newArray");
let bars = document.getElementsByClassName("bar");
let menus = document.getElementsByClassName("menu");

function generateArray(){
    while(bars.length > 0){
        bars[0].parentNode.removeChild(bars[0]);    
    }
    for(let i=0;i<currentArraySize;i++){
        let value = Math.floor(Math.random() * 100) + 1;
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 4.5}px`;
        array.appendChild(bar);
    }
}

function disable(){
    rangeSliderSize.disabled = true;
    rangeSliderSize.style.cursor = "not-allowed";
    for(let i=0;i<menus.length;i++){
        menus[i].disabled = true;
        menus[i].style.cursor = "not-allowed";
    }
}

function enable(){
    rangeSliderSize.disabled = false;
    rangeSliderSize.style.cursor = "pointer";
    for(let i=0;i<menus.length;i++){
        menus[i].disabled = false;
        menus[i].style.cursor = "pointer";
    }
}

async function bubbleSort(){
    let i, j;
    for(i=0;i<currentArraySize-1;i++){
        for(j=0;j<currentArraySize-i-1;j++){
            bars[j].style.backgroundColor = "rgb(31, 29, 29)";
            bars[j+1].style.backgroundColor = "rgb(31, 29, 29)";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );
            if(parseInt(bars[j].style.height, 10) > parseInt(bars[j+1].style.height, 10)){
                let temp = bars[j].style.height;
                bars[j].style.height = bars[j+1].style.height;
                bars[j+1].style.height = temp;
            }
            bars[j].style.backgroundColor = "rgb(64, 153, 255)";
            bars[j+1].style.backgroundColor = "rgb(64, 153, 255)";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );
        }
        bars[j].style.backgroundColor = "lightgreen";
    }
    bars[0].style.backgroundColor = "lightgreen";
}

async function insertionSort(){
    let i, j;
    for(i=1;i<currentArraySize;i++){
        j = i-1;
        let height = bars[i].style.height;
        while(j > -1 && (parseInt(bars[j].style.height, 10) > parseInt(height, 10))){
            bars[j].style.backgroundColor = "rgb(31, 29, 29)";
            bars[j+1].style.backgroundColor = "rgb(31, 29, 29)";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );
            let temp = bars[j].style.height;
            bars[j].style.height = bars[j+1].style.height;
            bars[j+1].style.height = temp;
            bars[j].style.backgroundColor = "rgb(64, 153, 255)";
            bars[j+1].style.backgroundColor = "rgb(64, 153, 255)";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );
            j--;
        }
    }
    for(i=0;i<currentArraySize;i++){
        bars[i].style.backgroundColor = "lightgreen";
    }
}

async function merge(l, mid, r){
    let size1 = mid - l + 1;
    let size2 = r - mid;
    let left = [];
    let right = [];
    for(let i=0;i<size1;i++){
        left.push(bars[l + i].style.height);
    }
    for(let i=0;i<size2;i++){
        right.push(bars[mid + 1 + i].style.height);
    }
    let i = 0;
    let j = 0;
    let k = l;
    while(i < size1 && j < size2){
        bars[l + i].style.backgroundColor = "rgb(31, 29, 29)";
        bars[mid + 1 + j].style.backgroundColor = "rgb(31, 29, 29)";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );
        if(parseInt(left[i], 10) < parseInt(right[j], 10)){
            bars[k].style.height = left[i];
            k++;
            bars[l + i].style.backgroundColor = "rgb(64, 153, 255)";
            bars[mid + 1 + j].style.backgroundColor = "rgb(64, 153, 255)";
            i++;
        }
        else{
            bars[k].style.height = right[j];
            k++;
            bars[l + i].style.backgroundColor = "rgb(64, 153, 255)";
            bars[mid + 1 + j].style.backgroundColor = "rgb(64, 153, 255)";
            j++;
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );
    }
    while(i < size1){
        bars[k].style.height = left[i];
        k++;
        i++;
    }
    while(j < size2){
        bars[k].style.height = right[j];
        k++;
        j++;
    }
}

async function mergeSort(l, r){
    if(l < r){
        let mid = l + parseInt((r - l) / 2);
        await mergeSort(l,mid);
        await mergeSort(mid+1,r);
        await merge(l,mid,r);
    }
}

async function partition(l, r){
    let pivot = bars[l].style.height;
    let ind = l;
    let j = l+1;
    while(j <= r){
        bars[l].style.backgroundColor = "rgb(31, 29, 29)";
        bars[j].style.backgroundColor = "rgb(31, 29, 29)";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );
        if(parseInt(pivot, 10) > parseInt(bars[j].style.height, 10)){
            ind++;
            let temp = bars[ind].style.height;
            bars[ind].style.height = bars[j].style.height;
            bars[j].style.height = temp;
        }
        bars[l].style.backgroundColor = "rgb(64, 153, 255)";
        bars[j].style.backgroundColor = "rgb(64, 153, 255)";
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );
        j++;
    }
    let temp = bars[ind].style.height;
    bars[ind].style.height = bars[l].style.height;
    bars[l].style.height = temp;
    return ind;
}

async function quickSort(l, r){
    if(l < r){
        let ind = await partition(l, r);
        bars[ind].style.backgroundColor = "lightgreen";
        await quickSort(l, ind-1);
        await quickSort(ind+1, r);
    }
    else if(l == r){
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );
        bars[l].style.backgroundColor = "lightgreen";
    }
}

async function heapify(){
    
}

async function heapSort(){
    
}

rangeSliderSize.addEventListener("input", function(){
    currentArraySize = rangeSliderSize.value * 2;
    if(currentArraySize === 0){
        currentArraySize = 20;
    }
    generateArray();
});

rangeSliderSpeed.addEventListener("input", function(){
    sortingSpeed = 1000 - (rangeSliderSpeed.value * 10);
});

generateNewArray.addEventListener("click", generateArray);

let bubbleSortBtn = document.querySelector("#bubbleSort");
bubbleSortBtn.addEventListener("click", 
    async function(){
        disable();
        await bubbleSort();
        enable();
    }
);

let insertionSortBtn = document.querySelector("#insertionSort");
insertionSortBtn.addEventListener("click", 
    async function(){
        disable();
        await insertionSort();
        enable();
    }
);

let mergeSortBtn = document.querySelector("#mergeSort");
mergeSortBtn.addEventListener("click", 
    async function(){
        disable();
        await mergeSort(0,currentArraySize-1);
        enable();
        for(i=0;i<currentArraySize;i++){
            bars[i].style.backgroundColor = "lightgreen";
        }
    }
);

let quickSortBtn = document.querySelector("#quickSort");
quickSortBtn.addEventListener("click", 
    async function(){
        disable();
        await quickSort(0,currentArraySize-1);
        enable();
    }
);

let heapSortBtn = document.querySelector("#heapSort");
heapSortBtn.addEventListener("click", 
    async function(){
        disable();
        await heapSort();
        enable();
    }
);

window.onload = function(){
    generateArray();
}