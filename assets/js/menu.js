document.addEventListener("DOMContentLoaded", function () {

  const closedBook = document.getElementById("closedBook");
  const bookWrapper = document.getElementById("bookWrapper");

  let initialized = false;
  let pageFlip;

  function initBook() {

    if (initialized) return;

    pageFlip = new St.PageFlip(
      document.getElementById("flipbook"),
      {
        width: 500,
        height: 700,

        minWidth: 280,
        maxWidth: 1000,

        minHeight: 400,
        maxHeight: 1400,

        size: "stretch",

        showCover: true,

        usePortrait: false,

        autoSize: true,

        drawShadow: false,

        flippingTime: 1000,

        maxShadowOpacity: 0,

        mobileScrollSupport: false,

        startZIndex: 10
      }
    );

    pageFlip.loadFromHTML(
      document.querySelectorAll(".page")
    );

    initialized = true;

    pageFlip.on("flip", (e) => {

      const currentPage = e.data;
      const totalPages = pageFlip.getPageCount();

      /* RETURN TO FRONT COVER */
      if (currentPage === 0) {

        bookWrapper.classList.remove("active");
        bookWrapper.classList.remove("back-cover");

        setTimeout(() => {
          closedBook.classList.remove("open");
        }, 300);
      }

      /* LAST PAGE */
      if (currentPage === totalPages - 1) {

        bookWrapper.classList.add("back-cover");

      } else {

        bookWrapper.classList.remove("back-cover");
      }

    });
  }

  closedBook.addEventListener("click", function () {

    initBook();

    /* SLIDE COVER AWAY */
    closedBook.classList.add("open");

    /* SHOW BOOK */
    setTimeout(() => {

      bookWrapper.classList.add("active");

    }, 250);

  });

});