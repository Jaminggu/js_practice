let itemPriceList = [18900, 19990, 10900];
let clickCheck = 0;

let checkAll = document.querySelector("#checkAll");
let checkedCount = document.querySelector("#checkedCount");
let totalCount = document.querySelector("#totalCount");
let itemCheck = document.querySelectorAll(".itemCheck");
let itemCount = document.querySelectorAll(".itemCount");
let itemPrice = document.querySelectorAll(".itemPrice");
let minusBtn = document.querySelectorAll(".minusBtn");
let plusBtn = document.querySelectorAll(".plusBtn");
let delBtn = document.querySelectorAll(".delBtn");
let cartTable = document.querySelector("#cartTable");

//  [문제01] 전체선택에 전체 상품수량 숫자 적용
totalItemsCount();

//  [문제02] 전체선택 체크박스 설정
checkAll.addEventListener("click", selectAllItems);

//  [문제03 - 1] 상품이 모두 선택되면, 전체선택 체크박스 true로 변경
//  [문제03 - 2] 상품이 일부만 선택되면,  전체선택 체크박스 false로 변경
selectEachItem();

//  [문제04 - 1] 수량 증가 및 감소 기능
//  [문제04 - 2] 0개로 감소되는 것 막기 ( 수량은 최소 1개 )
//  [문제04 - 3] 수량 증감에 따른 가격 변화
itemCountPlus();
itemCountMinus();
totalPrice();

//  [문제05] x버튼 클릭 시, 해당 상품 삭제
deleteItem();

//  [문제06] 선택된 상품 수량 표시
//  countCheckItems() 함수로 정의

//  [문제07] 선택된 상품을 일괄적으로 삭제
checkAll.parentElement.nextElementSibling.nextElementSibling.addEventListener(
  "click",
  deleteAllSelectItem
);

function totalItemsCount() {
  itemCheck = document.querySelectorAll(".itemCheck");
  totalCount.innerHTML = itemCheck.length;
}

function selectAllItems() {
  if (checkAll.checked) {
    for (let i = 0; i < itemCheck.length; i++) {
      itemCheck[i].checked = true;
    }
  } else {
    for (let i = 0; i < itemCheck.length; i++) {
      itemCheck[i].checked = false;
    }
  }
  countCheckItems();
}

function selectEachItem() {
  for (let i = 0; i < itemCheck.length; i++) {
    itemCheck[i].addEventListener("click", countCheckItems);
  }
}

function countCheckItems() {
  let checkCnt = 0;
  itemCheck = document.querySelectorAll(".itemCheck");

  for (let i = 0; i < itemCheck.length; i++) {
    if (itemCheck[i].checked) {
      checkCnt++;
    }
  }

  if (checkCnt == itemCheck.length) {
    checkAll.checked = true;
  } else {
    checkAll.checked = false;
  }

  checkedCount.innerText = checkCnt;
}

function itemCountPlus() {
  for (let i = 0; i < itemCheck.length; i++) {
    plusBtn[i].addEventListener("click", () => {
      let currentCount = parseInt(itemCount[i].innerText);
      itemCount[i].innerText = (currentCount + 1).toString();
      totalPrice(i);
    });
  }
}

function itemCountMinus() {
  for (let i = 0; i < itemCheck.length; i++) {
    minusBtn[i].addEventListener("click", () => {
      let currentCount = parseInt(itemCount[i].innerText);
      if (currentCount > 1) {
        itemCount[i].innerText = (currentCount - 1).toString();
      }
      totalPrice(i);
    });
  }
}

function totalPrice(i) {
  if (itemCount && itemCount[i]) {
    if (itemPrice && itemPrice[i]) {
      if (
        !isNaN(parseInt(itemCount[i].innerText)) &&
        !isNaN(itemPriceList[i])
      ) {
        itemPrice[i].innerText = (
          itemPriceList[i] * parseInt(itemCount[i].innerText)
        ).toString();
      }
    }
  }
}

function deleteItem() {
  for (let i = 0; i < itemCheck.length; i++) {
    delBtn[i].addEventListener("click", () => {
      cartTable.children[0].children[i + 1].remove();
      itemPriceList.splice(i, 1);
      countCheckItems();
      totalItemsCount();

    });
  }
}

function deleteAllSelectItem() {
  for (let i = 0; i < itemCheck.length; i++) {
    if (itemCheck[i].checked) {
      cartTable.children[0].children[i + 1].remove();
      itemPriceList.splice(i, 1);
    }
  }
  countCheckItems();
  totalItemsCount();
}
