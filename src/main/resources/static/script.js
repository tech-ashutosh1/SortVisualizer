async function startSorting() {
    let input = document.getElementById("arrayInput").value;
    let array = input.split(",").map(Number);

    try {
        let response = await fetch("http://localhost:8080/sort/bubble", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(array)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let steps = await response.json();
        console.log("Sorting Steps:", steps); // Debugging
        visualizeSorting(steps);  // Ensure this function exists before calling
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function visualizeSorting(steps) {
    let visualization = document.getElementById("visualization");
    visualization.innerHTML = "";

    let totalBars = steps[0].length;  // Number of bars
    let containerWidth = visualization.clientWidth;  // Get div width dynamically
    let containerHeight = visualization.clientHeight; // Get div height dynamically
    let maxElement = Math.max(...steps[steps.length - 1]); // Find max value in sorted array
    let barWidth = Math.max(5, Math.floor(containerWidth / totalBars) - 4); // Adjust bar width

    function draw(arr) {
        console.log("Drawing step:", arr); // Debugging log
        visualization.innerHTML = "";

        arr.forEach(num => {
            let bar = document.createElement("div");
            bar.className = "bar";
            bar.style.height = (num / maxElement) * containerHeight + "px"; // Normalize height
            bar.style.width = barWidth + "px";
            bar.style.margin = "2px";
            bar.style.display = "inline-block";
            bar.style.backgroundColor = "blue";
            visualization.appendChild(bar);
        });
    }

    console.log("Total steps received:", steps.length); // Debugging log
    steps.forEach((step, index) => {
        setTimeout(() => draw(step), index * 50);
    });
}


