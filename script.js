//your JS code here. If required.
const output = document.getElementById("output");

const loadingRow = document.createElement("tr");
loadingRow.id = "loading";
const loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
output.appendChild(loadingRow);

function createPromise(promiseNum) {
  const delay = (Math.random() * 2 + 1).toFixed(3);
  return new Promise(resolve => {
    setTimeout(() => resolve({ promiseNum, delay }), delay * 1000);
  });
}

const promises = [createPromise(1), createPromise(2), createPromise(3)];
const startTime = performance.now();

Promise.all(promises).then(results => {
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);
  output.innerHTML = "";
  results.forEach(result => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>Promise ${result.promiseNum}</td><td>${result.delay}</td>`;
    output.appendChild(row);
  });
  const totalRow = document.createElement("tr");
  const maxDelay = Math.max(...results.map(r => parseFloat(r.delay))).toFixed(3);
  totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${maxDelay}</strong></td>`;
  output.appendChild(totalRow);
});
