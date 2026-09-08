import * as pdfjsLib from "../lib/pdf.min.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = "../lib/pdf.worker.min.js";

async function loadBook() {

    const pdf = await pdfjsLib.getDocument("../books/pdf/menu.pdf").promise;

    const container = document.getElementById("pages");

    for (let i = 1; i <= pdf.numPages; i++) {

        const page = await pdf.getPage(i);

        const viewport = page.getViewport({ scale: 1.6 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: ctx,
            viewport
        }).promise;

        // WRAP canvas into your existing page style
        const pageDiv = document.createElement("div");
        pageDiv.className = "page";

        pageDiv.innerHTML = `
            <div class="page_curve">
                <div class="front_page">
                    <img class="front_content">
                </div>
                <div class="back_page"></div>
            </div>
        `;

        // replace front content with PDF canvas
        pageDiv.querySelector(".front_page").appendChild(canvas);

        container.appendChild(pageDiv);
    }
}

loadBook();