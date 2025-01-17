let page = 1;
let isLoading = false;
async function getPosts() {
  const response = await fetch("");
  const posts = await response.json();
  return posts.reverse();
}

function appendItem(post) {
  const contentLineBox = document.querySelector(".content-line-box");
  const contentItem = document.createElement("a");
  contentItem.setAttribute("href", "javascript:void(0)");
  contentItem.innerHTML = `
    <div class="content-item-wrap">
      <div class="content-item-container">
        <div class="content-img-box">
          <img
            src="../../../staticfiles/images/blank-image.png"
            class="content-img"
          />
          <div class="scrap-btn-box">
            <button
              type="button"
              aria-label="scrap 토글 버튼"
              class="scrap-btn"
            >
              <span class="scrap-icon-box">
                <img
                  src="../../../staticfiles/images/scrap-off.png"
                  alt=""
                />
              </span>
            </button>
          </div>
        </div>
        <p class="content-title">
        노하우 게시물 제목이 들어갈 공간
        </p>
        <div class="content-bottom-box">
          <div class="content-uploader">
            <div class="uploader-img-box">
              <img
                src="../../../staticfiles/images/blank-image.png"
                class="uploader-img"
              />
            </div>
            <span class="uploader-name">작성자</span>
          </div>
          <div class="content-data-box">
            <span class="content-data"
              >스크랩 <span>3</span>
            </span>
            <span class="content-data"
              >조회 <span>153</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
  contentLineBox.appendChild(contentItem);
}
function showList() {
  const dummyArray = new Array(20).fill(0);
  dummyArray.forEach((post) => {
    appendItem(post);
  });
}
function handleScroll() {
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const totalHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= totalHeight - 300) {
    showList();
  }
}

window.addEventListener("scroll", handleScroll);
showList();

// 스크랩 버튼
const contentLineBox = document.querySelector(".content-line-box");
const scrapPopup = document.querySelector(".scrap-popup-wrap");
const scrapCancel = document.querySelector(".scrap-popup-cancel-wrap");

let timeoutId;
let animationTarget;

contentLineBox.addEventListener("click", handleScrapButtonClick);

function handleScrapButtonClick(e) {
  const target = e.target.closest(".scrap-btn");
  if (!target) return; // 스크랩 버튼이 아닌 경우 무시

  const img = target.querySelector("img");
  const imgSrc = img.getAttribute("src");

  if (imgSrc === "../../../staticfiles/images/scrap-off.png") {
    img.setAttribute("src", "../../../staticfiles/images/scrap-on.png");
    showPopup(scrapPopup);
  } else {
    img.setAttribute("src", "../../../staticfiles/images/scrap-off.png");
    showPopup(scrapCancel);
  }
}

// 팝업 보여주기
function showPopup(target) {
  clearTimeout(timeoutId);
  if (animationTarget) animationTarget.classList.remove("show-animation");
  animationTarget = target;
  animationTarget.classList.remove("hide-animation");
  animationTarget.classList.add("show-animation");

  // 일정 시간 후 팝업 숨기기
  timeoutId = setTimeout(() => {
    hidePopup();
  }, 3000);
}

// 팝업 숨기기
function hidePopup() {
  if (!animationTarget) return;
  animationTarget.classList.remove("show-animation");
  animationTarget.classList.add("hide-animation");
}

const filterSelecters = document.querySelectorAll(".filter-selecter");
filterSelecters.forEach((item) => {
  const modal = item.querySelector(".filter-modal");
  if (!modal) return;
  item.addEventListener("mouseenter", () => {
    modal.classList.add("open");
  });
  item.addEventListener("mouseleave", () => {
    modal.classList.remove("open");
  });

  const modalMenuBtns = item.querySelectorAll(".modal-menu-btn");
  modalMenuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      modalMenuBtns.forEach((btn) => {
        btn.classList.remove("choice");
      });
      btn.classList.add("choice");
      const targetFilterBtn = e.target
        .closest(".filter-selecter")
        .querySelector(".filter-btn");
      targetFilterBtn.style.color = "#c06888";
      targetFilterBtn.style.backgroundColor = " #ffeef1";
    });
  });
});

const options = document.querySelectorAll(".option");
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.target.closest(".option").classList.toggle("choice");
    if (option.classList.contains("choice")) {
      const optionValue = option.innerText;
      createOptionElement(optionValue);
    } else {
      const optionItems = document.querySelectorAll(".option-item");
      optionItems.forEach((item) => {
        console.log(item.innerText);
        if (item.innerText == e.target.innerText) {
          item.remove();
        }
      });
    }
  });
});
const optionResetBtn = document.querySelector(".option-reset-btn");
function createOptionElement(optionValue) {
  const optionItem = document.createElement("span");
  optionItem.classList.add("option-item");
  optionItem.innerHTML = `
  <button class="option-cancel-btn">
    ${optionValue}<svg
      class="option-cancel-btn-icon"
      width="12"
      height="12"
      fill="currentColor"
      size="16"
      name="dismiss_thick"
    >
      <path
        d="M6 4.94 3.879 2.817l-1.061 1.06L4.939 6 2.818 8.121l1.06 1.061L6 7.061l2.121 2.121 1.061-1.06L7.061 6l2.121-2.121-1.06-1.061L6 4.939zM6 12A6 6 0 1 1 6 0a6 6 0 0 1 0 12z"
      ></path>
    </svg>
  </button>
  `;
  const parentElement = optionResetBtn.parentNode;
  parentElement.insertBefore(optionItem, optionResetBtn);
}
