const container = document.getElementById("card-container");
const refreshBtn = document.getElementById("refreshBtn");

function loadUsers() {
  container.innerHTML = "";

  fetch("https://randomuser.me/api/?results=3&seed=" + Date.now())
    .then(res => res.json())
    .then(data => {

      data.results.forEach(user => {

        const card = document.createElement("div");
        card.className = "w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-lg";

        const top = document.createElement("div");
        top.className = "flex items-center gap-4";

        const img = document.createElement("img");
        img.src = user.picture.large;
        img.className = "h-16 w-16 rounded-full border-2 border-slate-700 object-cover";

        const userInfo = document.createElement("div");

        const roles = ["Frontend Dev", "Backend Dev", "UI Designer", "Team Lead"];
        const role = document.createElement("p");
        role.className = "text-sm uppercase tracking-[0.24em] text-slate-400";
        role.textContent = roles[Math.floor(Math.random() * roles.length)];

        const name = document.createElement("h1");
        name.className = "mt-1 text-2xl font-semibold text-white";
        name.textContent = user.name.first + " " + user.name.last;

        const desc = document.createElement("p");
        desc.className = "text-sm text-slate-400";
        desc.textContent = user.email;

        userInfo.append(role, name, desc);
        top.append(img, userInfo);

        const stats = document.createElement("div");
        stats.className = "mt-6 space-y-4 rounded-3xl bg-slate-800/80 p-5";

        function createStat(label, value) {
          const row = document.createElement("div");
          row.className = "flex items-center justify-between text-sm text-slate-300";

          const left = document.createElement("span");
          left.className = "font-medium text-slate-100";
          left.textContent = label;

          const right = document.createElement("span");
          right.className = "font-semibold text-white";
          right.textContent = value;

          row.append(left, right);
          return row;
        }

        stats.append(
          createStat("Projects", Math.floor(Math.random() * 50)),
          createStat("Followers", (Math.random() * 20).toFixed(1) + "k")
        );

        const availability = document.createElement("div");
        availability.className = "flex items-center justify-between text-sm text-slate-300";

        const availText = document.createElement("span");
        availText.className = "font-medium text-slate-100";
        availText.textContent = "Availability";

        const availStatus = document.createElement("span");
        availStatus.className = "rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200";
        availStatus.textContent = Math.random() > 0.5 ? "Available" : "Busy";

        availability.append(availText, availStatus);
        stats.appendChild(availability);

        const buttons = document.createElement("div");
        buttons.className = "mt-6 flex gap-3";

        const msgBtn = document.createElement("button");
        msgBtn.className = "flex-1 rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400";
        msgBtn.textContent = "Message";

        const followBtn = document.createElement("button");
        followBtn.className = "flex-1 rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500";
        followBtn.textContent = "Follow";

        buttons.append(msgBtn, followBtn);

        card.append(top, stats, buttons);
        container.appendChild(card);
      });

    });
}

loadUsers();

refreshBtn.addEventListener("click", loadUsers);