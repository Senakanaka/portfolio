console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let pages = [
//   { url: "/", title: "Home" },
//   { url: "projects/", title: "Projects" },
//   { url: "cv-resume/", title: "CV/Resume" },
//   { url: "contact/", title: "Contact" },
//   { url: "meta/", title: "Meta" },
//   { url: "https://github.com/Senakanaka", title: "GitHub" },
// ];

// let nav = document.createElement("nav");
// document.body.prepend(nav);

// const ARE_WE_HOME = document.documentElement.classList.contains("home");

// for (let p of pages) {
//   let url = p.url;
//   let title = p.title;
//   url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;
//   let a = document.createElement("a");
//   a.href = url;
//   a.textContent = title;
//   nav.append(a);
//   if (a.host == location.host && a.pathname === location.pathname) {
//     a.classList.add("current");
//   }
//   if (a.host !== location.host) {
//     a.target = "_blank";
//   }
// }

let pages = [
    { url: '/index.html', title: 'Home' },
    { url: '/projects/index.html', title: 'Projects' },
    { url: '/resume/index.html', title: 'CV/Resume' },
    { url: '/contact/index.html', title: 'Contact' },
    { url: 'https://github.com/Senakanaka', title: 'Github' }
];


let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // if (!ARE_WE_HOME && !url.startsWith('http')) {
    //     url = '../' + url;
    //  }
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
      }
    if (a.host !== location.host) {
        a.target = "_blank";
      }
    nav.append(a);
  }

document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>`,
);

const select = document.querySelector(".color-scheme select");
const savedScheme = localStorage.getItem("colorScheme");

if (savedScheme) {
  document.documentElement.style.setProperty("color-scheme", savedScheme);
  select.value = savedScheme;
}
if (savedScheme) {
    if (savedScheme.includes("light") && savedScheme.includes("dark")) {
      document.documentElement.classList.add("auto");
    } else {
      document.documentElement.classList.add(savedScheme);
    }
  }
  

select.addEventListener("input", function (event) {
    const value = event.target.value;
    document.documentElement.style.setProperty("color-scheme", value);
    localStorage.colorScheme = value;
  
    // Remove any old theme classes
    document.documentElement.classList.remove("light", "dark", "auto");
  
    // Add correct new theme class
    if (value.includes("light") && value.includes("dark")) {
      document.documentElement.classList.add("auto");
    } else if (value === "light") {
      document.documentElement.classList.add("light");
    } else if (value === "dark") {
      document.documentElement.classList.add("dark");
    }
  });
  

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON data: ", error);
  }
}

export function renderProjects(project, containerElement, headingLevel = "h2") {
  containerElement.innerHTML = "";

  for (const proj of project) {
    const article = document.createElement("article");
    article.innerHTML = `
            <h3>${proj.title}</h3>
            <h4>${proj.year}</h4>
            <img src="${proj.image}" alt="${proj.title}">
            <p>${proj.description}</p>
        `;
    containerElement.appendChild(article);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}